import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Loader, Message, List } from 'semantic-ui-react';
import groupBy from 'lodash.groupby';
import keyBy from 'lodash.keyby';
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

    if (events.error) {
      return (
        <Message
          compact
          negative
          header="Something went wrong!"
          content={events.error}
        />
      );
    }

    if (invites.error) {
      return (
        <Message
          compact
          negative
          header="Something went wrong!"
          content={invites.error}
        />
      );
    }

    if (teams.error) {
      return (
        <Message
          compact
          negative
          header="Something went wrong!"
          content={teams.error}
        />
      );
    }

    if (events.loading || invites.loading || teams.loading) {
      return <Loader active inline="centered" />;
    }

    const eventInvites = groupBy(invites.list, 'eventId');
    const keyedEvents = keyBy(events.list, 'id');
    const groupedTeams = groupBy(teams.list, 'eventId');

    return (
      <Container>
        <List divided verticalAlign="middle">
          {Object.entries(eventInvites).map(([eventId, eventTeams]) => {
            const hasTeam = (groupedTeams[eventId] || []).length > 0;
            return (
              <React.Fragment key={eventId}>
                <List.Header>
                  {keyedEvents[eventId].name}
                  {' '}
                  { hasTeam ? '(You already have a team for this event!)' : null }
                </List.Header>
                {eventTeams.map(team => (
                  <Invite
                    key={team.id}
                    teamId={team.id}
                    hasTeam={hasTeam}
                  />
                ))}
              </React.Fragment>
            );
          })}
        </List>
      </Container>
    );
  }
}

export default inject('events', 'invites', 'teams')(observer(Invites));
