import React from 'react';
import PropTypes from 'prop-types';
import { Title, Button, Notification } from 'bloomer';
import NotificationHOC from './NotificationHOC';

const NotificationBanner = ({ show, subscribed, error, loading, onSubscribe, onUnsubscribe }) => (
  <React.Fragment>
    <Title isSize={5} tag="h2">Notifications</Title>
    {/* show errors only when show is true.
        When show is false the error is a title on the button */}
    {error && show ? (
      <Notification isColor="danger">{error}</Notification>
    ) : null}

    {subscribed ? (
      <Button
        onClick={onUnsubscribe}
        isLoading={loading}
      >
        Unsubscribe
      </Button>
    ) : (
      <Button
        onClick={onSubscribe}
        isLoading={loading}
        title={!show ? error : null}
        disabled={!show}
      >
        Subscribe
      </Button>
    )}
  </React.Fragment>
);
NotificationBanner.propTypes = {
  show: PropTypes.bool,
  subscribed: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};
NotificationBanner.defaultProps = {
  show: false,
  subscribed: false,
  error: null,
  loading: false,
};

export default NotificationHOC(NotificationBanner);
