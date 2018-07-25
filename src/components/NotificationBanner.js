import React from 'react';
import PropTypes from 'prop-types';
import { Button, Notification } from 'bloomer';
import NotificationHOC from './NotificationHOC';

const NotificationBanner = ({ show, subscribed, error, loading, onSubscribe }) => {
  if (!show || subscribed) {
    return null;
  }

  return (
    <React.Fragment>
      {error ? (
        <Notification isColor="danger">{error}</Notification>
      ) : (
        <Notification isColor="success">
          <p className="margin-bottom">Subscribe to push notifications to get updates about the event</p>
          <Button
            onClick={onSubscribe}
            isLoading={loading}
          >
            Subscribe
          </Button>
        </Notification>
      )}
    </React.Fragment>
  );
};
NotificationBanner.propTypes = {
  show: PropTypes.bool,
  subscribed: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSubscribe: PropTypes.func.isRequired,
};
NotificationBanner.defaultProps = {
  show: false,
  subscribed: false,
  error: null,
  loading: false,
};

export default NotificationHOC(NotificationBanner);
