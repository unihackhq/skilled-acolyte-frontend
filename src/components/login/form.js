import React from 'react'
import { Button, Checkbox, Form, Container } from 'semantic-ui-react'

export default ({ onSubmit }) => (
  <Form>
    <Form.Field>
      <label>Email address</label>
      <input type='email' placeholder='Email Address' required/>
    </Form.Field>
    <Button type='submit' onClick={onSubmit}>Submit</Button>
  </Form>
)
