import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

class LoginForm extends React.PureComponent {
  static propTypes = {
    sent: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = { email: '' }

  handleChange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.email);
  }

  render() {
    const { loading, sent } = this.props;
    const { email } = this.state;

    return (
      <Form>
        <Form.Field>
          <label>Email address</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={this.handleChange}
            required
          />
        </Form.Field>

        {loading ? (
          <Button type="submit" disabled loading>Loading</Button>
        ) : (
          <Button
            type="submit"
            onClick={this.handleSubmit}
            disabled={email.length === 0}
          >
            {sent ? 'Resend' : 'Login'}
          </Button>
        )}
      </Form>
    );
  }
}

export default LoginForm;
