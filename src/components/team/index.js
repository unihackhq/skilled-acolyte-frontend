import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as teamActions, selectors as teamSelectors } from '../../ducks/team';
import { Container, Header, Dropdown } from 'semantic-ui-react';

const teamOptions = (teams) => {
  if (teams) {
    return Object.keys(teams).map((id) => {
      return {key: teams[id], text: teams[id], value: teams[id]};
    });
  }
};

const TeamSearchSelection = ({teams}) => (
  <Dropdown placeholder="Select Team" fluid search selection
  options={teamOptions(teams)} />
);

class Team extends Component {
  componentWillMount() {
    this.props.dispatch(teamActions.fetchTeams());
  }

  render() {
    return (
      <Container>
        <Header as="h1">My Team</Header>
        <TeamSearchSelection teams={this.props.teams}></TeamSearchSelection>
      </Container>
    );
  }
}

const stateMap = (state) => ({
  teams: teamSelectors.teams(state)
});

export default connect(stateMap)(Team);
