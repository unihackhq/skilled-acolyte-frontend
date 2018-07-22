import React from 'react';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { Notification, Label, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownContent, DropdownItem } from 'bloomer';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiPost } from '../../utils/api';
import './SendInvite.scss';

class SendInvite extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
    events: MobxPropTypes.observableObject.isRequired,
  }

  static defaultProps = {
    className: '',
  }

  state = {
    search: '',
    studentId: null,
    sending: false,
    open: false,
    dropdownOpen: false,
    error: null,
  }

  componentDidMount() {
    const { events } = this.props;
    reaction(
      () => events.selectedId,
      (id, self) => {
        this.reaction = self;

        if (id) {
          events.fetchAttendees();
        }
      },
      { fireImmediately: true },
    );
  }

  componentWillUnmount() {
    this.reaction.dispose();
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
    const { open, sending, error, studentId, search, dropdownOpen } = this.state;
    const { events, teams, teamId } = this.props;

    if (error) {
      return (
        <Notification isColor="danger">
          {error}
        </Notification>
      );
    }
    if (!open || !events.attendees) {
      return (
        <Button
          onClick={this.handleOpen}
          isLoading={open}
        >
          Invite
        </Button>
      );
    }

    const team = teams.findById(teamId);
    const alreadyMembers = team.members.map(m => m.id);
    team.invited.map(m => alreadyMembers.push(m.id));

    const lowercaseSearch = search.toLowerCase();
    const filteredStudents = events.attendees
      .map(s => ({ id: s.id, name: `${s.user.preferredName} ${s.user.lastName}` }))
      .filter(s => !alreadyMembers.includes(s.id))
      .filter(s => s.name.toLowerCase().includes(lowercaseSearch));

    return (
      <form onSubmit={this.handleSubmit} className="send-invite__root">
        <Dropdown
          className="send-invite__dropdown"
          isActive={dropdownOpen}
          disabled={sending || !studentId}
        >
          <DropdownTrigger>
            <Label htmlFor="send-invite-search">Search for a student</Label>
            <Input
              id="send-invite-search"
              type="text"
              value={search || ''}
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
          disabled={sending || !studentId}
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

export default inject('teams', 'events')(observer(SendInvite));
