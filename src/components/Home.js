import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Title } from 'bloomer';
import ScheduleTiles from './ScheduleTiles';
import NotificationBanner from './NotificationBanner';

const Home = ({ user }) => (
  <Container>
    {user.loggedIn ? <NotificationBanner /> : null}
    <Title isSize={3} tag="h1">Home</Title>
    <p className="margin-bottom">
      Welcome {user.loggedIn ? user.details.user.preferredName : 'stranger'}
      {' '}
      <span role="img" aria-label="wave">👋</span>
    </p>
    {user.loggedIn ? <ScheduleTiles /> : null}
  </Container>
);
Home.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(Home));
