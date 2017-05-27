import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Dropdown } from 'semantic-ui-react';

const sizes = ['Small', 'Medium', 'Large', 'Extra Large'].map( size => ({key: size, value: size, text: size}) );

class RegisterForm extends Component {
  static propTypes = {
    data: PropTypes.shape({
      email: PropTypes.string,
      fname: PropTypes.string,
      lname: PropTypes.string,
    }).isRequired
  }

  render() {
    const { data, onSubmit } = this.props;
    return (
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
  }
}

export default RegisterForm;
