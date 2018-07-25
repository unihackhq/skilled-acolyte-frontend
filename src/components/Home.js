import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Title } from 'bloomer';
import ScheduleTiles from './ScheduleTiles';
import NotificationBanner from './NotificationBanner';
import Page from './Page';

const Home = ({ user }) => (
  <Page>
    {user.loggedIn ? <NotificationBanner /> : null}
    <Title isSize={3} tag="h1">Home</Title>
    <p className="margin-bottom">
      Welcome {user.loggedIn ? user.details.user.preferredName : 'stranger'}
      {' '}
      <span role="img" aria-label="wave">👋</span>
    </p>
    {user.loggedIn ? <ScheduleTiles /> : null}
  </Page>
);
Home.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(Home));
