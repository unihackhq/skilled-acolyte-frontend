import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as teamActions, selectors as teamSelectors } from '../../ducks/team';
import { selectors as userSelectors } from '../../ducks/user';
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
    const { userDetails } = this.props;

    return (
      <Container>
        <Header as="h1">My Team</Header>
        <TeamInvites userId={userDetails.id} />
        {this.renderContent()}
      </Container>
    );
  }
}

const stateMap = (state) => ({
  loading: teamSelectors.isLoading(state),
  inviting: teamSelectors.isInviting(state),
  team: teamSelectors.team(state),
  userDetails: userSelectors.details(state),
  state: state
});

const actionMap = (dispatch) => ({
  smartFetch: (state) => smartActions.fetchTeam(dispatch, state),
  inviteStudent: (studentId) => dispatch(teamActions.inviteStudent(studentId))
});

export default connect(stateMap, actionMap)(Team);
