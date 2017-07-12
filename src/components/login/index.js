import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as userActions, selectors as userSelectors } from '../../ducks/user';
import { Container, Header, Message } from 'semantic-ui-react';
import LoginForm from './form';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emailSent === false && nextProps.emailSent === true) {
      this.setState({
        loading: false
      });
    }
  }

  login = (event, email) => {
    event.preventDefault();

    this.setState({
      loading: true
    });
    this.props.login(email);
  }

  render() {
    const { emailSent, loggedIn } = this.props;
    const { loading } = this.state;

    return (
      <Container>
        <Header as="h2">Login</Header>
        { emailSent && (
          <Message compact>
            <Message.Header>Check your inbox</Message.Header>
            An email with login instructions has been sent to your email.
          </Message>
        ) }
        {/* show login form if not logged in */}
        { !loggedIn ? (
          <LoginForm onSubmit={this.login} loading={loading} emailSent={emailSent} />
        ) : (
          <Redirect to="/#loggedin" />
        ) }
      </Container>
    );
  }
}

const stateMap = (state) => ({
  emailSent: userSelectors.emailSent(state),
  loggedIn: userSelectors.loggedIn(state)
});

const actionMap = (dispatch) => ({
  login: (email) => dispatch(userActions.loginEmail(email))
});

export default connect(stateMap, actionMap)(Login);
