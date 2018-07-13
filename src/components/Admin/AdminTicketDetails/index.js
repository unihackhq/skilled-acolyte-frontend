import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, MessageHeader, MessageBody, Title } from 'bloomer';
import { apiGet } from '../../../utils/api';
import TicketTransfer from './Transfer';
import Loader from '../../Loader';

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
    this.fetchTicket();
  }

  fetchTicket = () => {
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

    return (
      <Container>
        <Title tag="h1">{ticket.name}</Title>
        <pre>{JSON.stringify(ticket, null, 4)}</pre>
        <TicketTransfer ticketId={ticket.id} refresh={this.fetchTicket} />
      </Container>
    );
  }
}

export default AdminTicketDetails;
