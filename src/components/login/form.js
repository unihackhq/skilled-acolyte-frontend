import React from 'react';
import { Button, Form } from 'semantic-ui-react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  render() {
    const { onSubmit, loading, sent } = this.props;
    const { email } = this.state;

    return (
      <Form>
        <Form.Field>
          <label>Email address</label>
          <input type="email" placeholder="Email Address" value={email} onChange={this.handleChange} required/>
        </Form.Field>
        {loading === true ? (
          <Button type="submit" disabled loading>Loading</Button>
        ) : (
          <Button type="submit" onClick={(e) => onSubmit(e, email)}>{sent ? 'Resend' : 'Login'}</Button>
        )}
      </Form>
    );
  }
}

export default LoginForm;
