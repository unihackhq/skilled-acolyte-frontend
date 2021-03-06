import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Title, Button } from 'bloomer';
import Loader from '../Loader';
import Page from '../Page';
import './ProfileDetails.scss';

const ProfileDetails = ({ user: userStore }) => {
  const { user, studyLevel, degree, university } = userStore.details;
  const { preferredName, lastName, email, gender, mobile, dateOfBirth } = user;

  const date = new Date(dateOfBirth);
  const formattedDate = date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Page>
      {userStore.fetching ? (
        /* show some indication something is going on while also showing the old data */
        <Loader />
      ) : null}
      <Title tag="h1" isSize={3}>
        {preferredName} {lastName}
      </Title>
      <div className="profile-details__section">
        <Title tag="h2" isSize={5}>
          Gender
        </Title>
        {gender}
      </div>
      <div className="profile-details__section">
        <Title tag="h2" isSize={5}>
          Date of Birth
        </Title>
        {formattedDate}
      </div>
      <div className="profile-details__section">
        <Title tag="h2" isSize={5}>
          Email
        </Title>
        {email}
      </div>
      <div className="profile-details__section">
        <Title tag="h2" isSize={5}>
          Mobile Number
        </Title>
        {mobile}
      </div>
      <Title tag="h2" isSize={5}>
        Education
      </Title>
      <div className="profile-details__section">
        <Title tag="h3" isSize={6}>
          University
        </Title>
        {university.name}
      </div>
      <div className="profile-details__section">
        <Title tag="h3" isSize={6}>
          Degree
        </Title>
        {degree} - {studyLevel}
      </div>
      <Button
        render={props => <Link to="/profile/edit" {...props}>Edit</Link>}
      />
    </Page>
  );
};
ProfileDetails.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(ProfileDetails));
