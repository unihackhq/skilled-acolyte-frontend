import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors as teamSelectors } from '../../ducks/team';
import * as smartActions from '../../ducks/smartActions';
import { Container, Header } from 'semantic-ui-react';

class Team extends Component {
  componentWillMount() {
    const { smartFetch, state } = this.props;
    smartFetch(state);
  }

  renderContent() {
    const { loading, team } = this.props;
    if (loading === true) {
      return <p>Loading</p>;
    }
    if (team === null) {
      return <p>Create</p>;
    }
    return <p>Display</p>;
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
  team: teamSelectors.team(state),
  state: state
});

const actionMap = (dispatch) => ({
  smartFetch: (state) => smartActions.fetchTeam(dispatch, state)
});

export default connect(stateMap, actionMap)(Team);
