import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { List, Button, Message } from 'semantic-ui-react';
import { apiPost } from '../../utils/api';
import FatalButton from '../FatalButton';

class Invite extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    hasTeam: PropTypes.bool,
    user: MobxPropTypes.observableObject.isRequired,
    invites: MobxPropTypes.observableObject.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
  }

  static defaultProps = {
    hasTeam: false,
  }

  state = { accepting: false, rejecting: false }

  handleAccept = () => {
    const { teamId, user, invites, teams } = this.props;

    this.setState({ accepting: true });

    apiPost(`/students/${user.details.id}/invites/${teamId}/accept`)
      .then(
        async () => {
          this.setState({ accepting: false });
          invites.fetchList();
          teams.fetchList();
        },
        (error) => {
          this.setState({ error: error.body.message, accepting: false });
        },
      );
  }

  handleReject = () => {
    const { teamId, user, invites, teams } = this.props;

    this.setState({ rejecting: true });

    apiPost(`/students/${user.details.id}/invites/${teamId}/reject`)
      .then(
        async () => {
          this.setState({ rejecting: false });
          invites.fetchList();
          teams.fetchList();
        },
        (error) => {
          this.setState({ error: error.body.message, rejecting: false });
        },
      );
  }

  render() {
    const { invites, teamId, hasTeam } = this.props;
    const { accepting, rejecting, error } = this.state;

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

    const team = invites.findByTeam(teamId);

    return (
      <List.Item>
        <List.Content floated="right">
          <Button
            onClick={this.handleAccept}
            loading={accepting}
            disabled={accepting || hasTeam}
            content="Accept"
          />
          <FatalButton
            onClick={this.handleReject}
            isLoading={rejecting}
            disabled={rejecting || hasTeam}
          >
            Reject
          </FatalButton>
        </List.Content>
        <List.Content>
          {`${team.name} (${team.members.length})`}
        </List.Content>
      </List.Item>
    );
  }
}

export default inject('user', 'invites', 'teams')(observer(Invite));
