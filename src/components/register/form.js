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
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  handleChange = (key, e) => {
    this.setState({
      data: {
        ...this.state.data,
        [key]: e.target.value
      }
    });
  }

  handleSelect = (e, data) => {
    this.setState({
      data: {
        ...this.state.data,
        tshirt: data.value
      }
    });
  }

  handleSubmit = (e) => {
    this.props.onSubmit(e, this.state.data);
  }

  render() {
    const { loading } = this.props;
    const { data } = this.state;

    return (
      <Form>
        <Form.Field>
          <label>Email address</label>
          <Input
            type="email"
            placeholder="Email Address"
            value={data.email}
            onChange={(e) => this.handleChange('email', e)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>First Name</label>
          <Input
            placeholder="First Name"
            value={data.fname}
            onChange={(e) => this.handleChange('fname', e)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <Input
            placeholder="Last Name"
            value={data.lname}
            onChange={(e) => this.handleChange('lname', e)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>T-Shirt Size</label>
          <Dropdown
            placeholder="Select Your T-Shirt Size"
            fluid
            search
            selection
            options={sizes}
            value={data.tshirt}
            onChange={this.handleSelect}
          />
        </Form.Field>
        <Button type="submit" onClick={this.handleSubmit} loading={loading}>Submit</Button>
      </Form>
    );
  }
}

export default RegisterForm;
