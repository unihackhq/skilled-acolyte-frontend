import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRegisterInfo, register } from '../../api/user';
import { Container, Header, Loader, Dimmer } from 'semantic-ui-react';
import RegisterForm from './form';

class Register extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      fetching: true,
      sending: false,
      data: {}
    };
  }

  componentWillMount() {
    // get the user info using the token
    getRegisterInfo(this.props.match.params.token)
      .then((data) => {
        this.setState({
          fetching: false,
          data: data
        });
      });
  }

  handleSubmit = (e, data) => {
    e.preventDefault();

    this.setState({
      sending: true
    });

    // hit the api with the data
    register(data)
      .then(() => {
        this.setState({
          sending: false
        });
      });

    // TODO: probably login the user or redirect to login page
  }

  render() {
    const { fetching, sending, data } = this.state;

    if (fetching) {
      return (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      );
    }

    return (
      <Container>
        <Header as="h2">Register</Header>
        <RegisterForm data={data} onSubmit={this.handleSubmit} loading={sending} />
      </Container>
    );
  }
}

export default Register;
