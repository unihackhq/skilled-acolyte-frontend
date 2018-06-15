import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Loader, Message, Button } from 'semantic-ui-react';
import withLazyLoad from '../../utils/lazyLoad';

const TeamDetails = withLazyLoad(() => import('./details'));
const CreateTeam = withLazyLoad(() => import('./create'));
const EditTeam = withLazyLoad(() => import('./edit'));

class DisplayTeam extends React.Component {
  static propTypes = {
    teams: MobxPropTypes.observableObject.isRequired,
    eventId: PropTypes.string.isRequired,
  }

  state = { editing: false };

  componentDidMount() {
    const { teams } = this.props;
    teams.fetchList();
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing });
  }

  render() {
    const { teams, eventId } = this.props;
    const { loading, error, findByEvent } = teams;

    if (error) {
      return (
        <Message
          compact
          negative
          header="Something went wrong!"
          content={error}
        />
      );
    }

    if (loading) {
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
          {eventTeams.map(team => <TeamDetails key={team.id} teamId={team.id} leaveOnly />)}
        </div>
      );
    }

    const teamId = eventTeams[0].id;
    if (this.state.editing) {
      return (
        <React.Fragment>
          <Button onClick={this.toggleEditing}>Back</Button>
          <EditTeam teamId={teamId} onFinish={this.toggleEditing} />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Button onClick={this.toggleEditing}>Edit</Button>
        <TeamDetails teamId={teamId} />
      </React.Fragment>
    );
  }
}

export default inject('teams')(observer(DisplayTeam));
