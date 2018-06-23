import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Loader, Header } from 'semantic-ui-react';
import { apiGet } from '../utils/api';

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
        <Header as="h1">{event.name}</Header>
        <pre>{JSON.stringify(event, null, 4)}</pre>
      </Container>
    );
  }
}

export default AdminEventDetails;
