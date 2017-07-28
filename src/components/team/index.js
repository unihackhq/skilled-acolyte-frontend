import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as teamActions, selectors as teamSelectors } from '../../ducks/team';
import * as smartActions from '../../ducks/smartActions';
import { Container, Header, Loader } from 'semantic-ui-react';
import CreateTeam from './create';
import TeamDetails from './details';
import TeamInvites from './invites';

class Team extends Component {
  componentWillMount() {
    const { smartFetch, state } = this.props;
    smartFetch(state);
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
      <Container>
        <Header as="h1">My Team</Header>
        { !loading && <TeamInvites hasTeam={team !== null} /> }
        {this.renderContent()}
      </Container>
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
  smartFetch: (state) => smartActions.fetchTeam(dispatch, state),
  inviteStudent: (studentId) => dispatch(teamActions.inviteStudent(studentId)),
  createTeam: (teamName) => dispatch(teamActions.create(teamName)),
  leaveTeam: () => dispatch(teamActions.leave())
});

export default connect(stateMap, actionMap)(Team);
