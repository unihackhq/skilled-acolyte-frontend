import React, { Component } from 'react';

import { Button, Form, Input, Dropdown } from 'semantic-ui-react'

const sizes = ['Small', 'Medium', 'Large', 'Extra Large'].map( size => ({key: size[0], value: size[0], text: size}) );

const RegisterForm = ({ data, onSubmit }) => (
  <Form>
    <Form.Field>
      <label>Email address</label>
      <Input type="email" placeholder="Email Address" defaultValue={data.email} required/>
    </Form.Field>
    <Form.Field>
      <label>First Name</label>
      <Input placeholder="First Name" defaultValue={data.fname} required/>
    </Form.Field>
    <Form.Field>
      <label>Last Name</label>
      <Input placeholder="Last Name" defaultValue={data.lname} required/>
    </Form.Field>
    <Form.Field>
      <label>T-Shirt Size</label>
      <Dropdown placeholder="Select Your T-Shirt Size" fluid search selection options={sizes} />
    </Form.Field>
    <Button type="submit" onClick={onSubmit}>Submit</Button>
  </Form>
);

export default RegisterForm;
