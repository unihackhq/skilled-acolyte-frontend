import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Message, MessageHeader, MessageBody } from 'bloomer';

const ErrorMessage = ({ error }) => (
  <Container>
    <Message isColor="danger">
      <MessageHeader>Something went wrong!</MessageHeader>
      <MessageBody>
        <p>{error}</p>
        <p>Please refresh this page. If this issue persists please contact us.</p>
      </MessageBody>
    </Message>
  </Container>
);
ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

const StoreErrors = ({ user, events, teams, invites }) => {
  if (user.error) return <ErrorMessage error={user.error} />;
  if (events.error) return <ErrorMessage error={events.error} />;
  if (teams.error) return <ErrorMessage error={teams.error} />;
  if (invites.error) return <ErrorMessage error={invites.error} />;
  return null;
};
StoreErrors.propTypes = {
  user: MobxPropTypes.observableObject.isRequired,
  events: MobxPropTypes.observableObject.isRequired,
  teams: MobxPropTypes.observableObject.isRequired,
  invites: MobxPropTypes.observableObject.isRequired,
};

export default inject('user', 'events', 'teams', 'invites')(observer(StoreErrors));
