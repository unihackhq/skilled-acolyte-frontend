import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setTitle } from '../../utils';
import { getInfo } from '../../api/register';
import { Container, Header } from 'semantic-ui-react';
import RegisterForm from './form';

class Register extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  componentWillMount() {
    setTitle('Register');
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    const userdata = getInfo(this.props.match.params.token);

    return (
      <Container>
        <Header as="h2">Register</Header>
        <RegisterForm data={userdata} onSubmit={this.handleSubmit} />
      </Container>
    );
  }
}

export default Register;
