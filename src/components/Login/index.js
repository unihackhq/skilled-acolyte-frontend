import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Header, Message } from 'semantic-ui-react';
import LoginForm from './Form';

class Login extends React.PureComponent {
  state = { sent: false };

  login = (email) => {
    this.setState({ sent: true });
  }

  render() {
    const loggedIn = false;
    const { sent } = this.state;

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

        <LoginForm onSubmit={this.login} sent={sent} loading={false} />
      </Container>
    );
  }
}

export default Login;
