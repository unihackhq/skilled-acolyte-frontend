import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, MessageHeader, MessageBody, Title } from 'bloomer';
import { apiGet } from '../../utils/api';
import Loader from '../Loader';

class AdminEventDetails extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    event: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    apiGet(`/events/${id}`, localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const event = await resp.json();

          this.setState({ event, loading: false });
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  render() {
    const { loading, event, error } = this.state;

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
        <Title tag="h1">{event.name}</Title>
        <pre>{JSON.stringify(event, null, 4)}</pre>
      </Container>
    );
  }
}

export default AdminEventDetails;
