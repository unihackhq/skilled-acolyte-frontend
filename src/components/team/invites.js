import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Message, Button, Icon, List } from 'semantic-ui-react';
import { getInvites } from '../../api/team';

class TeamInvites extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired
  }
  state = { invites: null }

  componentWillMount() {
    getInvites(this.props.userId)
      .then(
        (invites) => {
          this.setState({
            invites
          });
        }
      );
  }

  render() {
    const { invites } = this.state;
    if (invites === null) {
      return null;
    }

    if (invites.length === 1) {
      const { teamName } = invites[0];
      return (
        <Message>
          <Message.Header>Team Invitation</Message.Header>
          <p>You have an invite from <b>{teamName}</b>. Do you want to accept?</p>
          <Button positive size="tiny"><Icon name="checkmark" /> Accept</Button>
          <Button negative size="tiny"><Icon name="remove" /> Ignore</Button>
        </Message>
      );
    }

    return (
      <Message>
        <Message.Header>Team Invitation</Message.Header>
        <p>You have invites from multiple teams.</p>
        <List divided relaxed>
          {invites.map(
            ({ id, teamName }) => (
              <List.Item>
                <p>Invite from: <b>{teamName}</b></p>
                <Button positive size="mini"><Icon name="checkmark" /> Accept</Button>
                <Button negative size="mini"><Icon name="remove" /> Ignore</Button>
              </List.Item>
            )
          )}
        </List>
      </Message>
    );
  }
}

export default TeamInvites;
