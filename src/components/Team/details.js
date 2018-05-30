import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Message } from 'semantic-ui-react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiPost } from '../../utils/api';
import SendInvite from '../SendInvite';

class TeamDetails extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
    user: MobxPropTypes.observableObject.isRequired,
    leaveOnly: PropTypes.bool,
  }

  static defaultProps = {
    leaveOnly: false,
  }

  state = { leaving: false, error: null }

  handleLeave = () => {
    const { teamId, teams, user } = this.props;

    this.setState({ leaving: true });

    apiPost(`/students/${user.details.id}/teams/${teamId}/leave`)
      .then(
        async () => {
          this.setState({ leaving: false });
          teams.fetchList();
        },
        (error) => {
          this.setState({ error: error.body.message, leaving: false });
        },
      );
  }

  render() {
    const { teamId, teams, leaveOnly } = this.props;
    const { leaving, error } = this.state;
    const team = teams.findById(teamId);

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

    if (leaveOnly) {
      return (
        <div>
          {`${team.name} (${team.members.length} members)`}
          <Button
            negative
            size="mini"
            onClick={this.handleLeave}
            content="Leave"
            loading={leaving}
            disabled={leaving}
          />
        </div>
      );
    }

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

        <SendInvite teamId={teamId} />
        <Button
          negative
          onClick={this.handleLeave}
          content="Leave"
          loading={leaving}
          disabled={leaving}
        />
      </div>
    );
  }
}

export default inject('teams', 'user')(observer(TeamDetails));
