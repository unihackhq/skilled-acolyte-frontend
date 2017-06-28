import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const LoginForm = ({ onSubmit }) => (
  <Form>
    <Form.Field>
      <label>Email address</label>
      <input type="email" placeholder="Email Address" required/>
    </Form.Field>
    <Button type="submit" onClick={onSubmit}>Submit</Button>
  </Form>
);

export default LoginForm;
