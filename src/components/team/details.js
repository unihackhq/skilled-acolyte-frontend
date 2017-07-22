import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, List, Button, Form, Dropdown } from 'semantic-ui-react';

// fake data for now
const members = [
  {
    key: '1',
    value: '1',
    text: 'Erfan'
  },
  {
    key: '2',
    value: '2',
    text: 'Someone'
  },
  {
    key: '3',
    value: '3',
    text: 'Someone else'
  }
];

class TeamDetails extends Component {
  static propTypes = {
    team: PropTypes.object.isRequired
  }
  state = { inviting: false }

  startInviting = (event) => {
    this.setState({
      inviting: true
    });
  }

  stopInviting = (event) => {
    event.preventDefault();
    this.setState({
      inviting: false
    });
  }

  handleChange = (event, data) => {
    // TODO: actually add to list
  }

  render() {
    const { team } = this.props;
    const { inviting } = this.state;

    return (
      <div>
        <Header as="h2">{team.name}</Header>
        <List divided>
          {team.members.map(
            (member) => (
              <List.Item key={member.email}>
                <List.Content>
                  <List.Header>{member.name}</List.Header>
                  <List.Description>{member.email}</List.Description>
                </List.Content>
              </List.Item>
            )
          )}
        </List>
        {inviting ? (
          <Form>
            <Form.Group>
              <Dropdown placeholder="Members" search selection openOnFocus options={members} onChange={this.handleChange} />
              <Form.Button onClick={this.stopInviting}>Close</Form.Button>
            </Form.Group>
          </Form>
        ) : (
          <div>
            <Button primary onClick={this.startInviting}>Invite members</Button>
            <Button>Leave team</Button>
          </div>
        )}
      </div>
    );
  }
}

export default TeamDetails;
