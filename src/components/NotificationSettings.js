import React from 'react';
import PropTypes from 'prop-types';
import { Title, Button, Notification } from 'bloomer';
import NotificationHOC from './NotificationHOC';

const NotificationBanner = (props) => {
  const { enabled, subscribed, error, loading, onSubscribe, onUnsubscribe } = props;

  return (
    <React.Fragment>
      <Title isSize={5} tag="h2">Notifications</Title>
      {/* show errors only when enabled is true.
          When enabled is false the error is a title on the button */}
      {error && enabled ? (
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
          title={!enabled ? error : null}
          disabled={!enabled}
        >
          Subscribe
        </Button>
      )}
    </React.Fragment>
  );
};
NotificationBanner.propTypes = {
  enabled: PropTypes.bool,
  subscribed: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSubscribe: PropTypes.func.isRequired,
  onUnsubscribe: PropTypes.func.isRequired,
};
NotificationBanner.defaultProps = {
  enabled: false,
  subscribed: false,
  error: null,
  loading: false,
};

export default NotificationHOC(NotificationBanner);
