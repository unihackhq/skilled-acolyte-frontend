import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Loader, Message } from 'semantic-ui-react';
import TeamDetails from './details';
import CreateTeam from './create';

class DisplayTeam extends React.Component {
  static propTypes = {
    teams: MobxPropTypes.observableObject.isRequired,
    eventId: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { fetched, fetchList } = this.props.teams;

    if (!fetched) {
      fetchList();
    }
  }

  render() {
    const { teams, eventId } = this.props;
    const { fetched, findByEvent } = teams;

    if (!fetched) {
      return <Loader active inline="centered" />;
    }

    const eventTeams = findByEvent(eventId);
    if (eventTeams.length === 0) {
      return <CreateTeam eventId={eventId} />;
    }

    if (eventTeams.length > 1) {
      return (
        <div>
          <Message compact warning>
            <Message.Header>You can&apos;t be part of many teams!</Message.Header>
            <p>Looks like through some technical problem you have multiple teams!</p>
            <p>Please leave the extra teams.</p>
          </Message>
          {eventTeams.map(team => <p key={team.id}>{team.name}</p>)}
        </div>
      );
    }
    return <TeamDetails team={eventTeams[0]} />;
  }
}

export default inject('teams')(observer(DisplayTeam));
