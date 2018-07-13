import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import allowNull from '../utils/nullablePropTypes';

const FirstLaunchRedirect = ({ match, user }) => {
  if (!match && user.loggedIn && user.details.firstLaunch) {
    return <Redirect to="/first-launch" />;
  }

  return null;
};
FirstLaunchRedirect.propTypes = {
  match: allowNull(PropTypes.object.isRequired), // eslint-disable-line react/require-default-props
  user: MobxPropTypes.observableObject.isRequired,
};

export default inject('user')(observer(FirstLaunchRedirect));
