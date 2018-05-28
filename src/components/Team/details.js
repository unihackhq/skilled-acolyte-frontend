import React from 'react';
import { Header } from 'semantic-ui-react';
import { PropTypes as MobxPropTypes } from 'mobx-react';

const TeamDetails = ({ team }) => {
  const members = team.members.map(s => (
    <p key={s.id}>
      {`${s.user.preferredName} ${s.user.lastName}`}
    </p>
  ));
  const invited = team.invited.map(s => (
    <p key={s.id}>
      {`${s.user.preferredName} ${s.user.lastName}`}
    </p>
  ));

  return (
    <div>
      <Header as="h2">{team.name}</Header>
      <Header as="h3">Members</Header>
      {members.length > 0 ? members : <p>No members!</p>}
      <Header as="h3">Invites</Header>
      {invited.length > 0 ? invited : <p>No invited!</p>}
    </div>
  );
};
TeamDetails.propTypes = {
  team: MobxPropTypes.observableObject.isRequired,
};

export default TeamDetails;
