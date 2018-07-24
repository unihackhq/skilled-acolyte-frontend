import React from 'react';
import PropTypes from 'prop-types';
import { Title } from 'bloomer';
import InternalEditProfile from './InternalEditProfile';
import Page from '../Page';

const EditProfile = ({ history }) => (
  <Page>
    <Title isSize={3} tag="h1">Edit Profile</Title>
    <InternalEditProfile goBack={() => history.push('/profile')} />
  </Page>
);
EditProfile.propTypes = {
  history: PropTypes.object.isRequired,
};

export default EditProfile;
