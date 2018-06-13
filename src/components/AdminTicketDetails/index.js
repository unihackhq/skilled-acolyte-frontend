import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Loader, Header } from 'semantic-ui-react';
import { apiGet } from '../../utils/api';
import TicketTransfer from './Transfer';

class AdminTicketDetails extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    ticket: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    apiGet(`/tickets/${id}`, localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const ticket = await resp.json();

          this.setState({ ticket, loading: false });
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  render() {
    const { loading, ticket, error } = this.state;

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

    return (
      <Container>
        <Header as="h1">{ticket.name}</Header>
        <pre>{JSON.stringify(ticket, null, 4)}</pre>
        <TicketTransfer ticketId={ticket.id} />
      </Container>
    );
  }
}

export default AdminTicketDetails;
