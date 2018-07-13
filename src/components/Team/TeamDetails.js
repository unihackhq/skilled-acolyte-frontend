import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Title, Message, MessageHeader, MessageBody, Box, Button } from 'bloomer';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiPost } from '../../utils/api';
import SendInvite from './SendInvite';
import FatalButton from '../FatalButton';
import './TeamDetails.scss';

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
        <Message isColor="danger" isFullWidth={false}>
          <MessageHeader>
            Something went wrong!
          </MessageHeader>
          <MessageBody>
            {error}
          </MessageBody>
        </Message>
      );
    }

    if (leaveOnly) {
      return (
        <Box className="team-details-leave__root">
          <span className="team-details-leave__label">
            {team.name} ({team.members.length} members)
          </span>
          <FatalButton
            isSize="small"
            onClick={this.handleLeave}
            isLoading={leaving}
            disabled={leaving}
          >
            Leave
          </FatalButton>
        </Box>
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
      <div className="team-details__root">
        <div className="team-details__section">
          <Title isSize={3} tag="h2">
            {team.name}
          </Title>
          <p>{team.shortDescription}</p>
        </div>

        <div className="team-details__section">
          <Title isSize={5} tag="h3">
            Devpost Link
          </Title>
          <p>
            {team.devpostLink
              ? <a href={team.devpostLink}>Team&apos;s Devpost link</a>
              : <React.Fragment>Please create a <a href="https://devpost.com/">Devpost</a> team and link it here.</React.Fragment>}
          </p>
        </div>

        <div className="team-details__section">
          <Title isSize={5} tag="h3">Stack</Title>
          {team.stack ? <p>{team.stack}</p> : <p>Nothing here yet ;)</p>}
        </div>

        <div className="team-details__section">
          <Title isSize={5} tag="h3">Description</Title>
          {team.longDescription
            ? <p className="team-details__multiline">{team.longDescription}</p>
            : <p>Nothing here yet ;)</p>}
        </div>

        <div className="team-details__section">
          <Title isSize={5} tag="h3">Members</Title>
          {members.length > 0 ? members : <p>No members!</p>}
        </div>

        <div className="team-details__section">
          <Title isSize={5} tag="h3">Invites</Title>
          {invited.length > 0 ? invited : <p>No one invited!</p>}
        </div>

        <SendInvite teamId={teamId} />
        <Button
          render={props => <Link to="/team/edit" {...props}>Edit</Link>}
        />
        <FatalButton
          onClick={this.handleLeave}
          isLoading={leaving}
          disabled={leaving}
        >
          Leave
        </FatalButton>
      </div>
    );
  }
}

export default inject('teams', 'user')(observer(TeamDetails));
