import React, { Component } from 'react';
import { Message, Button, Icon } from 'semantic-ui-react';

class TeamInvites extends Component {
  render() {
    return (
      <Message>
        <Message.Header>Team Invitation</Message.Header>
        <p>You have an invite from <b>Some Team</b>. Do you want to accept?</p>
        <Button positive size="tiny"><Icon name="checkmark" /> Accept</Button>
        <Button negative size="tiny"><Icon name="remove" /> Ignore</Button>
      </Message>
    );
  }
}

export default TeamInvites;
