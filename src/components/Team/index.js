import React from 'react';
import { Container } from 'semantic-ui-react';
import EventSelector from '../EventSelector';
import DisplayTeam from './display';

class Team extends React.Component {
  state = { eventId: '' }

  handleEventChange = (eventId) => {
    this.setState({ eventId });
  }

  render() {
    const { eventId } = this.state;

    return (
      <Container>
        <EventSelector
          eventId={eventId}
          onChange={this.handleEventChange}
          label="My team for"
        />
        {eventId ? <DisplayTeam eventId={eventId} /> : null}
      </Container>
    );
  }
}

export default Team;
