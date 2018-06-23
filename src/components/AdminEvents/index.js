import React from 'react';
import { Container, Message, Loader, Accordion, Input } from 'semantic-ui-react';
import { apiGet } from '../../utils/api';
import Event from './Event';

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

  handleSearchChange = (e, data) => {
    this.setState({ query: data.value });
  }

  render() {
    const { loading, events, error, query } = this.state;

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

    const queryLowered = query.toLowerCase();
    // filter by event's name
    const filteredEvents = events.filter(e => e.name.toLowerCase().includes(queryLowered));

    const panels = filteredEvents.map(e => ({
      title: {
        key: `title-${e.id}`,
        content: e.name,
      },
      content: {
        key: `content-${e.id}`,
        content: <Event event={e} />,
      },
    }));

    return (
      <Container>
        <Input focus placeholder="Filter by name..." value={query} onChange={this.handleSearchChange} />
        <Accordion styled fluid panels={panels} />
      </Container>
    );
  }
}

export default AdminEvents;
