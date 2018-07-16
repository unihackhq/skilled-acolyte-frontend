import React from 'react';
import { Redirect } from 'react-router-dom';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import {
  Container,
  Columns,
  Column,
  Notification,
  Field,
  Label,
  Control,
  Input,
  Button,
} from 'bloomer';
import { apiPostNoAuth } from '../../utils/api';

import './Login.scss';

const columnSize = {
  tablet: 10,
  desktop: 8,
  widescreen: 6,
};

class Login extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  };

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
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;
    this.setState({ loading: true, sent: false, error: null });

    apiPostNoAuth(`/token/${email}`).then(
      () => {
        this.setState({ sent: true, loading: false });
      },
      (error) => {
        this.setState({ error: error.body.message, loading: false });
      },
    );
  };

  render() {
    const { loggedIn } = this.props.user;
    const { sent, error, loading, email } = this.state;

    if (loggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        <Columns isCentered>
          <Column isSize={columnSize}>
            {!!sent && (
              <Notification isColor="success">
                An email with login instructions has been sent to your email.
              </Notification>
            )}

            {!!error && (
              <Notification isColor="danger">
                {error}
              </Notification>
            )}

            <div className="page login-form">
              <h2 className="login-form__title">Login</h2>
              <p>
                Enter the email address associated with your UNIHACK ticket, and
                we will send you a magic link to your inbox.
              </p>
              <form onSubmit={this.handleSubmit}>
                <Field>
                  <Label htmlFor="login-email">Email</Label>
                  <Control>
                    <Input id="login-email" type="text" value={email} onChange={this.handleChange} />
                  </Control>
                </Field>
                <Button
                  type="submit"
                  isColor="primary"
                  isLoading={loading}
                  disabled={email.length === 0}
                  title={email.length === 0 ? 'You need to enter your email' : ''}
                >
                  {sent ? 'Resend' : 'Send me'}
                </Button>
              </form>
            </div>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default inject('user')(observer(Login));
