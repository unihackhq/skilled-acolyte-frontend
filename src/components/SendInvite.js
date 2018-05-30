import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiGet, apiPost } from '../utils/api';

class SendInvite extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
    user: MobxPropTypes.observableObject.isRequired,
  }

  state = {
    studentId: '',
    students: null,
    loadingStudents: true,
    sending: false,
    open: false,
  }

  componentDidMount() {
    apiGet('/students')
      .then(
        async (resp) => {
          const students = await resp.json();
          this.setState({ students, loadingStudents: false });
        },
        (error) => {
          this.setState({ error: error.body.message, loadingStudents: false });
        },
      );
  }

  getStudentOptions = () => {
    const { user, teams, teamId } = this.props;
    const { loadingStudents, students } = this.state;

    if (loadingStudents) {
      return [];
    }

    const alreadyMembers = teams.findById(teamId).members.map(m => m.id);
    alreadyMembers.push(user.details.id);


    return students
      .filter(s => !alreadyMembers.includes(s.id))
      .map(s => ({ value: s.id, text: `${s.user.preferredName} ${s.user.lastName}` }));
  }

  handleSend = () => {
    const { open, studentId } = this.state;
    const { teamId, teams } = this.props;

    if (!open) {
      this.setState({ open: true });
      return;
    }

    this.setState({ sending: true });

    apiPost(`/teams/${teamId}/invites`, {
      userId: studentId,
    })
      .then(
        async () => {
          this.setState({ sending: false });
          teams.fetchList();
        },
        (error) => {
          this.setState({ error: error.body.message, sending: false });
        },
      );
  }

  handleStudentSelect = (e, data) => {
    this.setState({ studentId: data.value });
  }

  render() {
    const { open, loadingStudents, sending, error, studentId } = this.state;

    if (error) {
      return (
        <Message
          compact
          negative
          header="Something went wrong!"
          content={error}
        />
      );
    }


    return (
      <Form>
        {open ? (
          <Form.Dropdown
            inline
            placeholder="Search for a student..."
            fluid
            search
            selection
            onChange={this.handleStudentSelect}
            value={studentId}
            options={this.getStudentOptions()}
            loading={loadingStudents}
            disabled={loadingStudents}
          />
        ) : null}
        <Form.Button
          onClick={this.handleSend}
          disabled={(open && loadingStudents) || sending}
          loading={sending}
        >
          Invite
        </Form.Button>
      </Form>
    );
  }
}

export default inject('teams', 'user')(observer(SendInvite));
