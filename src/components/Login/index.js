import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Container, Header, Message } from 'semantic-ui-react';
import { BASE_URL } from '../../constants';
import LoginForm from './Form';

class Login extends React.Component {
  state = {
    loading: false,
    sent: false,
    error: null,
  };

  login = async (email) => {
    this.setState({ loading: true, sent: false, error: null });
    try {
      const resp = await fetch(`${BASE_URL}/token/${email}`, { method: 'POST' });
      if (!resp.ok) {
        throw resp;
      }
      console.log(resp);

      this.setState({ sent: true, loading: false });
    } catch (error) {
      console.log(error);
      const { message } = await error.json();
      this.setState({ error: message, loading: false });
    }
  }

  render() {
    const loggedIn = this.props.user.loggedIn;
    const { sent, error, loading } = this.state;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Header as="h2">Login</Header>
        {sent && (
          <Message compact>
            <Message.Header>Check your inbox</Message.Header>
            An email with login instructions has been sent to your email.
          </Message>
        )}
        {error && (
          <Message compact error>
            <Message.Header>Something went wrong</Message.Header>
            {error}
          </Message>
        )}

        <LoginForm onSubmit={this.login} sent={sent} loading={loading} />
      </Container>
    );
  }
}

export default inject('user')(observer(Login));
