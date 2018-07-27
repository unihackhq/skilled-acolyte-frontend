import React from 'react';
import PropTypes from 'prop-types';
import { Button, Notification } from 'bloomer';
import NotificationHOC from '../NotificationHOC';
import './index.scss';

const NotificationBanner = (props) => {
  const { enabled, bannerHidden, subscribed, error, loading, onSubscribe, onHide } = props;

  if (!enabled || subscribed || bannerHidden) {
    return null;
  }

  return (
    <React.Fragment>
      {error ? (
        <Notification isColor="danger">{error}</Notification>
      ) : (
        <Notification isColor="success">
          <p className="notification-banner__text">
            Subscribe to push notifications to get updates about the event.
          </p>
          <Button
            onClick={onSubscribe}
            className="notification-banner__button"
            isLoading={loading}
          >
            Subscribe
          </Button>
          <Button
            onClick={onHide}
            className="notification-banner__button"
            isColor="dark"
            isOutlined
          >
            Not Interested
          </Button>
        </Notification>
      )}
    </React.Fragment>
  );
};
NotificationBanner.propTypes = {
  enabled: PropTypes.bool,
  bannerHidden: PropTypes.bool,
  subscribed: PropTypes.bool,
  error: PropTypes.string,
  loading: PropTypes.bool,
  onSubscribe: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
NotificationBanner.defaultProps = {
  enabled: false,
  bannerHidden: false,
  subscribed: false,
  error: null,
  loading: false,
};

export default NotificationHOC(NotificationBanner);
