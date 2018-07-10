import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, MessageHeader, MessageBody, Title } from 'bloomer';
import { apiGet } from '../../utils/api';
import Loader from '../Loader';

class AdminTeamDetails extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    team: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    apiGet(`/teams/${id}`, localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const team = await resp.json();

          this.setState({ team, loading: false });
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  render() {
    const { loading, team, error } = this.state;

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
        <Title tag="h1">{team.name}</Title>
        <pre>{JSON.stringify(team, null, 4)}</pre>
      </Container>
    );
  }
}

export default AdminTeamDetails;
