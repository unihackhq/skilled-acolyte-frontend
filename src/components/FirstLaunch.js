import React from 'react';
import { Title } from 'bloomer';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import InternalEditProfile from './Profile/InternalEditProfile';
import Page from './Page';

const FirstLaunch = ({ user }) => {
  const { firstLaunch } = user.details;
  if (!firstLaunch) {
    return <Redirect to="/" />;
  }

  return (
    <Page>
      <Title isSize={3} tag="h1">Confirm Your Details</Title>
      <div className="margin-bottom">
        <p>Welcome to the UNIHACK web app!</p>
        <p>
          We&apos;ve imported your details from eventbrite.
          {' '}
          Please make sure everything is correct.
        </p>
      </div>
      <InternalEditProfile />
    </Page>
  );
};
FirstLaunch.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(FirstLaunch));
