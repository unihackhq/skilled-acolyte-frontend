import React, { Component } from 'react';
import { setTitle } from '../../utils';
import { Container } from 'semantic-ui-react';

class Home extends Component {
  componentWillMount() {
    setTitle('Home');
  }

  render() {
    return (
      <Container>
        <p>Welcome 👋</p>
      </Container>
    )
  }
}

export default Home
