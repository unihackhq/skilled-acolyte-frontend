import React from 'react';
import { Container, Message, Loader, Accordion, Input } from 'semantic-ui-react';
import { apiGet } from '../../utils/api';
import Ticket from './Ticket';

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

  handleSearchChange = (e, data) => {
    this.setState({ query: data.value });
  }

  render() {
    const { loading, tickets, error, query } = this.state;

    if (error) {
      return (
        <Container>
          <Message
            compact
            negative
            header="Something went wrong!"
            content={error}
          />
        </Container>
      );
    }

    if (loading) {
      return <Loader active inline="centered" />;
    }

    // filter by ticket's eventbrite order
    const filteredTickets = tickets.filter(t => t.eventbriteOrder.includes(query));

    const panels = filteredTickets.map(t => ({
      title: {
        key: `title-${t.id}`,
        content: t.eventbriteOrder,
      },
      content: {
        key: `content-${t.id}`,
        content: <Ticket ticket={t} />,
      },
    }));

    return (
      <Container>
        <Input focus placeholder="Filter by eventbrite order..." value={query} onChange={this.handleSearchChange} />
        <Accordion styled fluid panels={panels} />
      </Container>
    );
  }
}

export default AdminTickets;
