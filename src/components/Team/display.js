import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Loader, Message } from 'semantic-ui-react';

class DisplayTeam extends React.Component {
  static propTypes = {
    teams: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { fetched, fetchList } = this.props.teams;

    if (!fetched) {
      fetchList();
    }
  }

  render() {
    const { teams, eventId } = this.props;
    const { fetched, grouped } = teams;

    if (!fetched) {
      return <Loader active inline="centered" />;
    }

    const eventTeams = grouped[eventId];
    if (!eventTeams || eventTeams.length === 0) {
      return <p>Create a team</p>;
    }

    if (eventTeams.length > 1) {
      return (
        <div>
          <Message compact>
            <Message.Header>You can&apos;t be part of many teams!</Message.Header>
            <p>Looks like through some technical problem you have multiple teams!</p>
            <p>Please leave the extra teams.</p>
          </Message>
          {eventTeams.map(team => <p key={team.id}>{team.name}</p>)}
        </div>
      );
    }
    return eventTeams.map(team => <p key={team.id}>{team.name}</p>);
  }
}

export default inject('teams')(observer(DisplayTeam));
