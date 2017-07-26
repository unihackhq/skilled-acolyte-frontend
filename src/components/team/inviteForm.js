import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import * as api from '../../api/student.js';

class InviteForm extends Component {
  static propTypes = {
    inviting: PropTypes.bool.isRequired,
    inviteStudent: PropTypes.func.isRequired
  }
  state = {
    currStudent: '',
    students: null
  }

  componentWillMount() {
    api.getAllStudents()
      .then((students) => {
        this.setState({
          students
        });
      });
  }

  inviteStudent = (event) => {
    event.preventDefault();

    const { currStudent, students } = this.state;

    const selectedId = students[currStudent].id;
    this.props.inviteStudent(selectedId);
  }

  handleChange = (event, data) => {
    this.setState({
      currStudent: data.value
    });
  }

  render() {
    const { inviting } = this.props;
    const { currStudent, students } = this.state;

    const options = students !== null ? students.map(({ name }, i) => ({ key: i, value: i, text: name })) : [];
    const dropdownLoading = students === null ? { loading: true } : {};

    return (
      <Form>
        <Form.Group>
          <Dropdown
            placeholder="Students"
            search
            selection
            openOnFocus
            options={options}
            value={currStudent}
            onChange={this.handleChange}
            {...dropdownLoading}
          />
          <Form.Button primary onClick={this.inviteStudent} loading={inviting} disabled={students === null}>Invite</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default InviteForm;
