import React from 'react';
import { Button, Notification } from 'bloomer';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import makeCancelable from '../utils/cancelablePromise';
import { apiGet, apiPost, apiDelete } from '../utils/api';

// convert VAPID key from the json safe format to binary data
const urlBase64ToUint8Array = (base64String) => {
  if (!base64String) {
    return null;
  }

  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i += 1) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

class NotificationBanner extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  }

  state = {
    subscribed: false,
    error: null,
    loading: false,
    key: null,
  }

  componentDidMount() {
    // set initial state
    this.initialState();

    // get the key in case we need to subscribe
    const { promise, cancel } = makeCancelable(apiGet('/notifications/vapid-key'));
    this.cancel = cancel;
    promise.then(
      async (resp) => {
        const { key } = await resp.json();
        this.setState({ key: urlBase64ToUint8Array(key) });
      },
      (err) => {
        if (err.isCanceled) return;
        this.setState({ error: err.body.message });
      },
    );
  }

  componentWillUnmount() {
    this.cancel();
  }

  initialState = async () => {
    // feature detect for service worker, push manager or notifications
    if (!('serviceWorker' in navigator && 'PushManager' in window
      && 'showNotification' in ServiceWorkerRegistration.prototype)) {
      this.setState({
        subscribed: false,
        error: 'Your browser does not support notifications.',
      });
    }

    // check permission
    if (Notification.permission === 'denied') {
      this.setState({
        subscribed: false,
        error: 'Please enable notification permission for this website in settings.',
      });
      return;
    }

    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription = await serviceWorkerRegistration.pushManager.getSubscription();

      if (subscription) {
        this.setState({ subscribed: true });
      } else {
        this.setState({ subscribed: false });
      }
    } catch (err) {
      this.setState({ subscribed: false });
    }
  }

  subscribe = async () => {
    const { key } = this.state;
    this.setState({ loading: true });

    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription = await serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: key,
      });

      // send subscription details to the backend
      try {
        await this.sendSubscription(subscription);
        this.setState({ subscribed: true, loading: false });
      } catch (err) {
        // there is no use having a subscription without the backend
        // knowing about it so let's unsubscribe so we can try again later
        await subscription.unsubscribe();
        this.setState({ subscribed: false, loading: false });
      }
    } catch (err) {
      // check if error was because of permission
      let error;
      if (Notification.permission === 'denied') {
        error = 'Please enable notification permission for this website in settings.';
      } else {
        error = 'An error occurred while subscribing you to notifications.';
      }

      this.setState({ subscribed: false, error, loading: false });
    }
  }

  sendSubscription = async (subscription) => {
    const { user, events } = this.props;
    const { endpoint, keys } = subscription.toJSON();

    // send subscription details along with event and student id
    const res = await apiPost('/notifications/subscriptions', {
      studentId: user.details.id,
      eventId: events.selectedId,
      endpoint,
      keys,
    });

    // store the id so we can remove it later
    const { id } = await res.json();
    localStorage.setItem('subscriptionId', id);
  }

  unsubscribe = async () => {
    this.setState({ loading: true });

    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const subscription = await serviceWorkerRegistration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();

        // tell the backend to not send notifications to this client anymore
        try {
          await this.sendUnsubscribe(subscription);
        } catch (err) { /* ignore errors here */ }

        this.setState({ subscribed: false, loading: false });
      }
    } catch (err) {
      this.setState({
        subscribed: false,
        loading: false,
        error: 'An error occurred while unsubscribing you from notifications.',
      });
    }
  }

  sendUnsubscribe = async () => {
    const id = localStorage.getItem('subscriptionId');
    // if there is no id we can't do anything about it
    if (id) {
      await apiDelete(`/notifications/subscriptions/${id}`);
      localStorage.removeItem('subscriptionId');
    }
  }

  render() {
    const { subscribed, error, loading, key } = this.state;

    return (
      <React.Fragment>
        {error ? <Notification>{error}</Notification> : null}
        {subscribed ? (
          <Button
            onClick={this.unsubscribe}
            isLoading={loading}
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            onClick={this.subscribe}
            disabled={!key}
            isLoading={loading}
          >
            Subscribe
          </Button>
        )}
      </React.Fragment>
    );
  }
}

export default inject('user', 'events')(observer(NotificationBanner));
