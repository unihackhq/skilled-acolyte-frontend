import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Title } from 'bloomer';
import ScheduleTiles from './ScheduleTiles';

const Home = ({ user }) => (
  <Container>
    <Title isSize={3} tag="h1">Home</Title>
    <p>
      Welcome {user.loggedIn ? user.details.user.preferredName : 'stranger'}
      {' '}
      <span role="img" aria-label="wave">👋</span>
    </p>
    <ScheduleTiles />
  </Container>
);
Home.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(Home));
