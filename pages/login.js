import Head from '../components/head'
import React from 'react'
import { Button, Checkbox, Form, Header, Container } from 'semantic-ui-react'

const FormExampleForm = () => (
  <Container text>
    <Head title='Login' menuKey='login'></Head>
    <Form>
      <Header as='h2'>Login</Header>
      <Form.Field>
        <label>Email address</label>
        <input type='email' placeholder='Email Address' required/>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  </Container>
)

export default FormExampleForm