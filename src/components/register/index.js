import React, { Component } from 'react';
import { setTitle } from '../../utils';
import { Container, Header } from 'semantic-ui-react';
import RegisterForm from './form';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {
        email: 'i@erfan.io',
        fname: 'Erfan',
        lname: 'Norozi',
        tshirt: 'S'
      }
    }
  }

  componentWillMount() {
    setTitle('Register');
  }

  render() {
    return (
      <Container>
        <Header as="h2">Register</Header>
        <RegisterForm data={this.state.userdata} />
      </Container>
    );
  }
}

export default Register;
