import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as userActions, selectors as userSelectors } from '../../ducks/user';
import { Container, Header, Message } from 'semantic-ui-react';
import LoginForm from './form';

class Login extends Component {
  login = (event, email) => {
    event.preventDefault();
    this.props.login(email);
  }

  render() {
    const { sent, loading, loggedIn } = this.props;

    return (
      <Container>
        <Header as="h2">Login</Header>
        { sent && (
          <Message compact>
            <Message.Header>Check your inbox</Message.Header>
            An email with login instructions has been sent to your email.
          </Message>
        ) }
        {/* show login form if not logged in */}
        { !loggedIn ? (
          <LoginForm onSubmit={this.login} loading={loading} sent={sent} />
        ) : (
          <Redirect to="/" />
        ) }
      </Container>
    );
  }
}

const stateMap = (state) => ({
  sent: userSelectors.isEmailSent(state),
  loading: userSelectors.isLoading(state),
  loggedIn: userSelectors.isLoggedIn(state)
});

const actionMap = (dispatch) => ({
  login: (email) => dispatch(userActions.loginEmail(email))
});

export default connect(stateMap, actionMap)(Login);
