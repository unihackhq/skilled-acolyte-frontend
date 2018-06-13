import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Loader, Header } from 'semantic-ui-react';
import { apiGet } from '../utils/api';

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
        <Header as="h1">{team.name}</Header>
        <pre>{JSON.stringify(team, null, 4)}</pre>
      </Container>
    );
  }
}

export default AdminTeamDetails;
