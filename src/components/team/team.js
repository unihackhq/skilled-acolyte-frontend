import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as teamActions, selectors as teamSelectors } from '../../ducks/team';
import * as smartActions from '../../ducks/smartActions';
import { Loader } from 'semantic-ui-react';
import CreateTeam from './create';
import TeamDetails from './details';
import TeamInvites from './invites';

class Team extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired
  }

  componentWillMount() {
    const { smartFetch, state, eventId } = this.props;
    smartFetch(state, eventId);
  }

  componentWillReceiveProps(nextProps) {
    const { smartFetch, state, eventId } = nextProps;
    if (this.props.eventId !== eventId) {
      smartFetch(state, eventId);
    }
  }

  renderContent() {
    const { loading, inviting, creating, leaving, team, inviteStudent, createTeam, leaveTeam } = this.props;
    if (loading === true) {
      return <Loader active inline="centered" />;
    }
    if (team === null) {
      return <CreateTeam onCreate={createTeam} creating={creating} />;
    }
    return <TeamDetails team={team} inviting={inviting} inviteStudent={inviteStudent} leaveTeam={leaveTeam} leaving={leaving} />;
  }

  render() {
    const { team, loading } = this.props;

    return (
      <div>
        { !loading && <TeamInvites hasTeam={team !== null} /> }
        {this.renderContent()}
      </div>
    );
  }
}

// TODO: maybe split these up and put them in the child components
const stateMap = (state) => ({
  loading: teamSelectors.isLoading(state),
  inviting: teamSelectors.isInviting(state),
  creating: teamSelectors.isCreating(state),
  leaving: teamSelectors.isLeaving(state),
  team: teamSelectors.team(state),
  state: state
});

const actionMap = (dispatch) => ({
  smartFetch: (state, eventId) => smartActions.fetchTeam(dispatch, state, eventId),
  inviteStudent: (studentId) => dispatch(teamActions.inviteStudent(studentId)),
  createTeam: (teamName) => dispatch(teamActions.create(teamName)),
  leaveTeam: () => dispatch(teamActions.leave())
});

export default connect(stateMap, actionMap)(Team);
