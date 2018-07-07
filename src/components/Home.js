import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container } from 'bloomer';

const Home = ({ user }) => (
  <Container>
    <p>
      Welcome {user.loggedIn ? user.details.user.preferredName : 'stranger'}
      {' '}
      <span role="img" aria-label="wave">👋</span>
    </p>
  </Container>
);
Home.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(Home));
