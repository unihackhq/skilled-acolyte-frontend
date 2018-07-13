import React from 'react';
import { Container, Message, MessageHeader, MessageBody, Field, Control, Label, Input } from 'bloomer';
import { Accordion, AccordionItem } from '../../Accordion';
import { apiGet } from '../../../utils/api';
import Ticket from './Ticket';
import Loader from '../../Loader';

class AdminTickets extends React.Component {
  state = {
    tickets: null,
    error: null,
    loading: true,
    query: '',
  };

  componentDidMount() {
    apiGet('/tickets', localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const tickets = await resp.json();
          this.setState({ tickets, loading: false });
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
    const { loading, tickets, error, query } = this.state;

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

    // filter by ticket's eventbrite order
    const filteredTickets = tickets.filter(t => t.eventbriteOrder.includes(query));

    return (
      <Container>
        <Field>
          <Label>Filter by eventbrite order</Label>
          <Control>
            <Input value={query} onChange={this.handleSearchChange} />
          </Control>
        </Field>
        <Accordion>
          {filteredTickets.map(t => (
            <AccordionItem title={t.eventbriteOrder} key={t.id}>
              <Ticket ticket={t} />
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    );
  }
}

export default AdminTickets;
