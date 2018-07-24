import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Message, MessageHeader, MessageBody,
  Field, Label, Control, Input, Button, Title } from 'bloomer';
import { apiPostNoAuth } from '../utils/api';

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

  handleSubmit = (event) => {
    event.preventDefault();

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
        <Title isSize={3} tag="h1">Login</Title>

        {sent ? (
          <Message isColor="success" isFullWidth={false}>
            <MessageHeader>
              Check your inbox
            </MessageHeader>
            <MessageBody>
              An email with login instructions has been sent to your email.
            </MessageBody>
          </Message>
        ) : null}
        {error ? (
          <Message isColor="danger" isFullWidth={false}>
            <MessageHeader>
              Something went wrong!
            </MessageHeader>
            <MessageBody>
              {error}
            </MessageBody>
          </Message>
        ) : null}

        <form onSubmit={this.handleSubmit}>
          <Field>
            <Label htmlFor="login-email">Email</Label>
            <Control>
              <Input
                id="login-email"
                type="text"
                value={email}
                onChange={this.handleChange}
              />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button
                type="submit"
                isColor="primary"
                isLoading={loading}
                disabled={email.length === 0}
                title={email.length === 0 ? 'You need to enter your email' : ''}
              >
                {sent ? 'Resend' : 'Send me'}
              </Button>
            </Control>
          </Field>
        </form>
      </Container>
    );
  }
}

export default inject('user')(observer(Login));
