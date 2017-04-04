import React, { Component } from 'react';
import { setTitle } from '../../utils';
import { Container, Header } from 'semantic-ui-react';

class Team extends Component {
  componentWillMount() {
    setTitle('My Team');
  }

  render() {
    return (
      <Container>
        <Header as='h1'>Team</Header>
      </Container>
    )
  }
}

export default Team;
