import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, List, Button } from 'semantic-ui-react';
import InviteForm from './inviteForm';

class TeamDetails extends Component {
  static propTypes = {
    team: PropTypes.object.isRequired,
    inviting: PropTypes.bool.isRequired,
    inviteStudent: PropTypes.func.isRequired
  }
  state = { inviteOpen: false }

  startInviting = (event) => {
    this.setState({
      inviteOpen: true
    });
  }

  stopInviting = (event) => {
    event.preventDefault();
    this.setState({
      inviteOpen: false
    });
  }

  render() {
    const { team, inviting, inviteStudent } = this.props;
    const { inviteOpen } = this.state;

    return (
      <div>
        <Header as="h2">{team.name}</Header>
        <List divided>
          {team.students.map(
            (student) => (
              <List.Item key={student.id}>
                {/* TODO: handle pending invitations */}
                <List.Content>
                  <List.Header>{student.name}</List.Header>
                  <List.Description>{student.email}</List.Description>
                </List.Content>
              </List.Item>
            )
          )}
        </List>
        {inviteOpen ? (
          <div>
            <InviteForm inviting={inviting} inviteStudent={inviteStudent} />
            <Button onClick={this.stopInviting}>Close</Button>
          </div>
        ) : (
          <div>
            <Button primary onClick={this.startInviting}>Invite students</Button>
            <Button>Leave team</Button>
          </div>
        )}
      </div>
    );
  }
}

export default TeamDetails;
