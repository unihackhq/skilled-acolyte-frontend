import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title } from 'bloomer';
import InternalEditProfile from './InternalEditProfile';

const EditProfile = ({ history }) => (
  <Container>
    <Title tag="h2" isSize={4}>Edit Profile</Title>
    <InternalEditProfile goBack={() => history.push('/profile')} />
  </Container>
);
EditProfile.propTypes = {
  history: PropTypes.object.isRequired,
};

export default EditProfile;
