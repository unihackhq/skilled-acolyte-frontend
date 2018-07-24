import React from 'react';
import { Route } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Message, MessageHeader, MessageBody, Box, Title } from 'bloomer';
import Loader from '../Loader';
import Page from '../Page';
import Invite from '../Invites/Invite';
import withLazyLoad from '../../utils/lazyLoad';

const TeamDetails = withLazyLoad(() => import('./TeamDetails'));
const CreateTeam = withLazyLoad(() => import('./CreateTeam'));
const EditTeam = withLazyLoad(() => import('./EditTeam'));

class Team extends React.Component {
  static propTypes = {
    teams: MobxPropTypes.observableObject.isRequired,
    events: MobxPropTypes.observableObject.isRequired,
    invites: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { teams, invites } = this.props;
    teams.fetchList();
    invites.fetchList();
  }

  renderInvites = () => {
    const { invites, events } = this.props;
    const { loading } = invites;

    if (loading) {
      return <Loader inline />;
    }

    const eventInvites = invites.list.filter(invite => invite.eventId === events.selectedId);
    if (eventInvites.length > 0) {
      return (
        <React.Fragment>
          <Title isSize={3} tag="h1">Invites</Title>
          {eventInvites.map(team => (
            <Box key={team.id}>
              <Invite
                key={team.id}
                teamId={team.id}
                hasTeam={false}
              />
            </Box>
          ))}
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    const { teams, events } = this.props;
    const { loading, filterByEvent } = teams;

    if (loading) {
      return <Loader />;
    }
    // no event selected (probably still loading)
    if (!events.selectedId) {
      return null;
    }

    const eventTeams = filterByEvent(events.selected.id);
    if (eventTeams.length === 0) {
      return (
        <Page>
          {this.renderInvites()}
          <CreateTeam />
        </Page>
      );
    }

    if (eventTeams.length > 1) {
      return (
        <Page>
          <Title isSize={3} tag="h1">Your Teams</Title>
          <Message isColor="danger">
            <MessageHeader>You can&apos;t be part of many teams!</MessageHeader>
            <MessageBody>
              <p>Looks like through some technical problem you have multiple teams!</p>
              <p>Please leave the extra teams.</p>
            </MessageBody>
          </Message>
          {eventTeams.map(team => <TeamDetails key={team.id} teamId={team.id} leaveOnly />)}
        </Page>
      );
    }

    const teamId = eventTeams[0].id;
    return (
      <Page>
        <Route exact path="/team/edit" component={() => <EditTeam teamId={teamId} />} />
        <Route exact path="/team" component={() => <TeamDetails teamId={teamId} />} />
      </Page>
    );
  }
}

export default inject('teams', 'events', 'invites')(observer(Team));
