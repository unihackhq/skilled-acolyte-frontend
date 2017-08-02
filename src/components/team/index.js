import React, { Component } from 'react';
import { Container, Header, Loader, Dropdown } from 'semantic-ui-react';
import * as api from '../../api/event.js';
import Team from './team';

class TeamEventSelector extends Component {
  state = {
    currEvent: '',
    events: null
  }

  componentWillMount() {
    api.getAllEvents()
      .then((events) => {
        this.setState({
          events,
          currEvent: events[0].id
        });
      });
  }

  handleChange = (event, data) => {
    this.setState({
      currEvent: data.value
    });
  }

  renderContent() {
    const { currEvent, events } = this.state;
    if (events === null) {
      return <Loader active inline="centered" />;
    }

    const options = events.map(({ name, id }) => ({ key: id, value: id, text: name }));
    return (
      <div>
        {/* hide for now...
        <div>Selected Event</div>
        <Dropdown
          placeholder="Events"
          label="Selected Event"
          selection
          options={options}
          value={currEvent}
          onChange={this.handleChange}
        />
        */}
        <Team eventId={currEvent} />
      </div>
    );
  }

  render() {
    return (
      <Container>
        <Header as="h1">My Team</Header>
        {this.renderContent()}
      </Container>
    );
  }
}

export default TeamEventSelector;
