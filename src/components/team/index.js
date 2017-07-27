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
    const { loading, inviting, creating, team, inviteStudent, createTeam } = this.props;
    if (loading === true) {
      return <Loader active inline="centered" />;
    }
    if (team === null) {
      return <CreateTeam onCreate={createTeam} creating={creating} />;
    }
    return <TeamDetails team={team} inviting={inviting} inviteStudent={inviteStudent} />;
  }

  render() {
    const { team } = this.props;

    return (
      <Container>
        <Header as="h1">My Team</Header>
        <TeamInvites hasTeam={team !== null} />
        {this.renderContent()}
      </Container>
    );
  }
}

const stateMap = (state) => ({
  // TODO: Split these up and add them to the child components
  loading: teamSelectors.isLoading(state),
  inviting: teamSelectors.isInviting(state),
  creating: teamSelectors.isCreating(state),
  team: teamSelectors.team(state),
  state: state
});

const actionMap = (dispatch) => ({
  smartFetch: (state) => smartActions.fetchTeam(dispatch, state),
  inviteStudent: (studentId) => dispatch(teamActions.inviteStudent(studentId)),
  createTeam: (teamName) => dispatch(teamActions.create(teamName))
});

export default connect(stateMap, actionMap)(Team);
