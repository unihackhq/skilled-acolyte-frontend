import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Message, MessageHeader, MessageBody, Box, Title } from 'bloomer';
import groupBy from 'lodash.groupby';
import keyBy from 'lodash.keyby';
import Loader from '../Loader';
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

  renderError = error => (
    <Message isColor="danger" isFullWidth={false}>
      <MessageHeader>
        Something went wrong!
      </MessageHeader>
      <MessageBody>
        {error}
      </MessageBody>
    </Message>
  )

  render() {
    const { events, invites, teams } = this.props;

    if (events.error) {
      return this.renderError(events.error);
    }
    if (invites.error) {
      return this.renderError(invites.error);
    }
    if (teams.error) {
      return this.renderError(teams.error);
    }
    if (events.loading || invites.loading || teams.loading) {
      return <Loader />;
    }

    const eventInvites = groupBy(invites.list, 'eventId');
    const keyedEvents = keyBy(events.list, 'id');
    const groupedTeams = groupBy(teams.list, 'eventId');

    return (
      <Container>
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
      </Container>
    );
  }
}

export default inject('events', 'invites', 'teams')(observer(Invites));
