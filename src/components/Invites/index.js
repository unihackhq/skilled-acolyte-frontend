import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Box, Title } from 'bloomer';
import groupBy from 'lodash.groupby';
import keyBy from 'lodash.keyby';
import Loader from '../Loader';
import Page from '../Page';
import Invite from './Invite';

class Invites extends React.Component {
  static propTypes = {
    events: MobxPropTypes.observableObject.isRequired,
    invites: MobxPropTypes.observableObject.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { events, invites, teams } = this.props;
    events.fetchList();
    invites.fetchList();
    teams.fetchList();
  }

  render() {
    const { events, invites, teams } = this.props;

    if (events.loading || invites.loading || teams.loading) {
      return <Loader />;
    }

    const eventInvites = groupBy(invites.list, 'eventId');
    const keyedEvents = keyBy(events.list, 'id');
    const groupedTeams = groupBy(teams.list, 'eventId');

    return (
      <Page>
        <Title isSize={3} tag="h1">Invites</Title>
        {Object.entries(eventInvites).map(([eventId, eventTeams]) => {
          const hasTeam = (groupedTeams[eventId] || []).length > 0;
          return (
            <Box key={eventId}>
              <Title isSize={3} tag="h2">
                {keyedEvents[eventId].name}
              </Title>
              {eventTeams.map(team => (
                <Invite
                  key={team.id}
                  teamId={team.id}
                  hasTeam={hasTeam}
                />
              ))}
            </Box>
          );
        })}
      </Page>
    );
  }
}

export default inject('events', 'invites', 'teams')(observer(Invites));
