import React from 'react';
import { Container, Message, MessageHeader, MessageBody, Field, Control, Label, Input } from 'bloomer';
import { Accordion, AccordionItem } from '../../Accordion';
import { apiGet } from '../../../utils/api';
import Event from './Event';
import Loader from '../../Loader';

class AdminEvents extends React.Component {
  state = {
    events: null,
    error: null,
    loading: true,
    query: '',
  };

  componentDidMount() {
    apiGet('/events', localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const events = await resp.json();
          this.setState({ events, loading: false });
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  handleSearchChange = (event) => {
    this.setState({ query: event.target.value });
  }

  render() {
    const { loading, events, error, query } = this.state;

    if (error) {
      return (
        <Container>
          <Message isColor="danger" isFullWidth={false}>
            <MessageHeader>
              Something went wrong!
            </MessageHeader>
            <MessageBody>
              {error}
            </MessageBody>
          </Message>
        </Container>
      );
    }

    if (loading) {
      return <Loader />;
    }

    const queryLowered = query.toLowerCase();
    // filter by event's name
    const filteredEvents = events.filter(e => e.name.toLowerCase().includes(queryLowered));

    return (
      <Container>
        <Field>
          <Label>Filter by name</Label>
          <Control>
            <Input value={query} onChange={this.handleSearchChange} />
          </Control>
        </Field>
        <Accordion>
          {filteredEvents.map(e => (
            <AccordionItem title={e.name} key={e.id}>
              <Event event={e} />
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    );
  }
}

export default AdminEvents;
