import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'bloomer';
import InternalEditProfile from './InternalEditProfile';

const EditProfile = ({ history }) => (
  <Container>
    <div className="page">
      <h2 className="page__title">Edit Profile</h2>
      <InternalEditProfile goBack={() => history.push('/profile')} />
    </div>
  </Container>
);
EditProfile.propTypes = {
  history: PropTypes.object.isRequired,
};

export default EditProfile;
