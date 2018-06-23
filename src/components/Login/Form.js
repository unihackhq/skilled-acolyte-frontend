import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'semantic-ui-react';

const LoginForm = ({ sent, loading, email, onChange, onSubmit }) => (
  <Form>
    <Form.Field>
      <label htmlFor="email">
        Email address

        <input
          id="email"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={onChange}
          required
        />
      </label>
    </Form.Field>

    {loading ? (
      <Button type="submit" disabled loading>Loading</Button>
    ) : (
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={email.length === 0}
      >
        {sent ? 'Resend' : 'Login'}
      </Button>
    )}
  </Form>
);
LoginForm.propTypes = {
  sent: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
