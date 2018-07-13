import React from 'react';
import { Route } from 'react-router-dom';
import EditProfile from './EditProfile';
import ProfileDetails from './ProfileDetails';

const Profile = () => (
  <React.Fragment>
    <Route exact path="/profile" component={ProfileDetails} />
    <Route exact path="/profile/edit" component={EditProfile} />
  </React.Fragment>
);

export default Profile;
