import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as userActions, selectors as userSelectors } from '../../ducks/user';
import { setTitle } from '../../utils';
import { Container, Header } from 'semantic-ui-react';
import LoginForm from './form';

class Login extends Component {
  componentWillMount() {
    setTitle('Login');
  }

  login = (event) => {
    event.preventDefault()

    // dummy action to change state
    const dummyDetails = {
      name: 'Erfan Norozi',
      email: 'i@erfan.io'
    } // I am the dummy

    this.props.dispatch(userActions.login(dummyDetails))
  }

  render() {
    return (
      <Container>
        <Header as='h2'>Login</Header>
        {/* show login form if not logged in */}
        { !this.props.loggedIn ? (
          <LoginForm onSubmit={this.login} />
        ) : (
          <div>LOGGED IN!</div>
        ) }
      </Container>
    )
  }
}

const stateMap = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
})

export default connect(stateMap)(Login);
