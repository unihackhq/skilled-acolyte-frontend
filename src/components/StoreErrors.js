import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import ErrorMessage from './ErrorMessage';

const StoreErrors = ({ user, events, teams, invites }) => {
  if (user.error) return <ErrorMessage><p>{user.error}</p></ErrorMessage>;
  if (events.error) return <ErrorMessage><p>{events.error}</p></ErrorMessage>;
  if (teams.error) return <ErrorMessage><p>{teams.error}</p></ErrorMessage>;
  if (invites.error) return <ErrorMessage><p>{invites.error}</p></ErrorMessage>;
  return null;
};
StoreErrors.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
  events: MobxPropTypes.observableObject.isRequired,
  teams: MobxPropTypes.observableObject.isRequired,
  invites: MobxPropTypes.observableObject.isRequired,
};

export default inject('user', 'events', 'teams', 'invites')(observer(StoreErrors));
