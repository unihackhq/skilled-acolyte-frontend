import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Header, Message } from 'semantic-ui-react';
import { apiPostNoAuth } from '../../utils/api';
import LoginForm from './Form';

class Login extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  }

  state = {
    loading: false,
    sent: false,
    error: null,
  };

  login = async (email) => {
    this.setState({ loading: true, sent: false, error: null });

    try {
      await apiPostNoAuth(`/token/${email}`);
      this.setState({ sent: true, loading: false });
    } catch (error) {
      const { message } = error.body;
      this.setState({ error: message, loading: false });
    }
  }

  render() {
    const { loggedIn } = this.props.user;
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
