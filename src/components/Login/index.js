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
    email: '',
  };

  handleChange = (event) => {
    this.setState({
      email: event.target.value,
      // reset state when the email changes
      sent: false,
      error: null,
    });
  }

  handleSubmit = () => {
    const { email } = this.state;

    this.setState({ loading: true, sent: false, error: null });

    apiPostNoAuth(`/token/${email}`)
      .then(
        () => {
          this.setState({ sent: true, loading: false });
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  render() {
    const { loggedIn } = this.props.user;
    const { sent, error, loading, email } = this.state;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Header as="h2">Login</Header>
        {sent ? (
          <Message
            compact
            positive
            header="Check your inbox"
            content="An email with login instructions has been sent to your email."
          />
        ) : null}
        {error ? (
          <Message
            compact
            negative
            header="Something went wrong!"
            content={error}
          />
        ) : null}

        <LoginForm
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          email={email}
          sent={sent}
          loading={loading}
        />
      </Container>
    );
  }
}

export default inject('user')(observer(Login));
