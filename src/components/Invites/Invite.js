import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Button, Notification } from 'bloomer';
import { apiPost } from '../../utils/api';
import FatalButton from '../FatalButton';
import './Invite.scss';

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
        <Notification isColor="danger">
          {error}
        </Notification>
      );
    }

    const team = invites.findByTeam(teamId);
    const memberCount = team.members.length;

    return (
      <div className="invites__invite__root">
        <div className="invites__invite__left">
          {team.name} ({memberCount} member{memberCount > 1 ? 's' : null})
        </div>
        <div className="invites__invite__right">
          <Button
            onClick={this.handleAccept}
            isLoading={accepting}
            disabled={accepting || hasTeam}
            title={hasTeam ? 'Leave your current team first!' : null}
          >
            Accept
          </Button>
          <FatalButton
            onClick={this.handleReject}
            isLoading={rejecting}
            disabled={rejecting}
          >
            Reject
          </FatalButton>
        </div>
      </div>
    );
  }
}

export default inject('user', 'invites', 'teams')(observer(Invite));
