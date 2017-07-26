import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as teamActions, selectors as teamSelectors } from '../../ducks/team';
import * as smartActions from '../../ducks/smartActions';
import { Container, Header, Loader } from 'semantic-ui-react';
import CreateTeam from './create';
import TeamDetails from './details';

class Team extends Component {
  componentWillMount() {
    const { smartFetch, state } = this.props;
    smartFetch(state);
  }

  renderContent() {
    const { loading, inviting, team, inviteStudent } = this.props;
    if (loading === true) {
      return <Loader active inline="centered" />;
    }
    if (team === null) {
      return <CreateTeam />;
    }
    return <TeamDetails team={team} inviting={inviting} inviteStudent={inviteStudent} />;
  }

  render() {
    return (
      <Container>
        <Header as="h1">My Team</Header>
        {this.renderContent()}
      </Container>
    );
  }
}

const stateMap = (state) => ({
  loading: teamSelectors.isLoading(state),
  inviting: teamSelectors.isInviting(state),
  team: teamSelectors.team(state),
  state: state
});

const actionMap = (dispatch) => ({
  smartFetch: (state) => smartActions.fetchTeam(dispatch, state),
  inviteStudent: (studentId) => dispatch(teamActions.inviteStudent(studentId))
});

export default connect(stateMap, actionMap)(Team);
