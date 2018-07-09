import React from 'react';
import PropTypes from 'prop-types';
import { Notification, Label, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownContent, DropdownItem } from 'bloomer';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiGet, apiPost } from '../../utils/api';
import Loader from '../Loader';
import './SendInvite.scss';

class SendInvite extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    search: '',
    studentId: null,
    students: null,
    loadingStudents: true,
    sending: false,
    open: false,
    dropdownOpen: false,
    error: null,
  }

  componentDidMount() {
    this.fetchList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.teamId !== this.props.teamId) {
      this.fetchList();
    }
  }

  fetchList = () => {
    const { teams, teamId } = this.props;
    const { eventId } = teams.findById(teamId);

    this.setState({ loadingStudents: true, studentId: '' });
    apiGet(`/events/${eventId}/attendees`)
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

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({
      open: false,
      search: '',
      studentId: null,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { studentId } = this.state;
    const { teamId, teams } = this.props;

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

  handleStudentSelect = (id, name) => {
    this.setState({
      search: name,
      studentId: id,
      dropdownOpen: false,
    });
  }

  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value,
      // reset selected student too
      studentId: null,
    });
  }

  handleOpenDropdown = () => {
    this.setState({ dropdownOpen: true });
  }

  handleCloseDropdown = () => {
    this.setState({ dropdownOpen: false });
  }

  render() {
    const { open, loadingStudents, sending, error, studentId, search,
      dropdownOpen, students } = this.state;

    if (error) {
      return (
        <Notification isColor="danger">
          {error}
        </Notification>
      );
    }

    if (!open) {
      return (
        <Button onClick={this.handleOpen}>
          Invite
        </Button>
      );
    }

    if (loadingStudents) {
      return <Loader inline noDelay />;
    }

    const { teams, teamId } = this.props;

    const team = teams.findById(teamId);
    const alreadyMembers = team.members.map(m => m.id);
    team.invited.map(m => alreadyMembers.push(m.id));

    const lowercaseSearch = search.toLowerCase();
    const filteredStudents = students
      .map(s => ({ id: s.id, name: `${s.user.preferredName} ${s.user.lastName}` }))
      .filter(s => !alreadyMembers.includes(s.id))
      .filter(s => s.name.toLowerCase().includes(lowercaseSearch));

    return (
      <form onSubmit={this.handleSubmit} className="send-invite__root">
        <Dropdown
          className="send-invite__dropdown"
          isActive={dropdownOpen}
          disabled={loadingStudents || sending || !studentId}
        >
          <DropdownTrigger>
            <Label htmlFor="send-invite-search">Search for a student</Label>
            <Input
              id="send-invite-search"
              type="text"
              value={search || ''}
              disabled={loadingStudents}
              onChange={this.handleSearchChange}
              onFocus={this.handleOpenDropdown}
              onBlur={this.handleCloseDropdown}
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownContent>
              {filteredStudents.map(s => (
                /* listening on mousedown since the blur will fire before click
                  and cause the click event to not fire */
                <DropdownItem
                  key={s.id}
                  tag="a"
                  onMouseDown={() => this.handleStudentSelect(s.id, s.name)}
                >
                  {s.name}
                </DropdownItem>
              ))}
              {filteredStudents.length === 0 ? (
                <DropdownItem tag="a">
                  <i>No Matches</i>
                </DropdownItem>
              ) : null}
            </DropdownContent>
          </DropdownMenu>
        </Dropdown>
        <Button
          type="submit"
          disabled={loadingStudents || sending || !studentId}
          isLoading={sending}
        >
          Send Invite
        </Button>
        <Button onClick={this.handleClose}>
          Cancel
        </Button>
      </form>
    );
  }
}

export default inject('teams')(observer(SendInvite));
