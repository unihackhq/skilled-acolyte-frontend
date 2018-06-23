import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, Loader, Header } from 'semantic-ui-react';
import { apiGet } from '../utils/api';

class AdminStudentDetails extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  state = {
    student: null,
    teams: null,
    invites: null,
    tickets: null,
    events: null,
    error: null,
    loading: true,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    Promise.all([
      apiGet(`/students/${id}`, localStorage.getItem('adminJwt')),
      apiGet(`/students/${id}/teams`, localStorage.getItem('adminJwt')),
      apiGet(`/students/${id}/invites`, localStorage.getItem('adminJwt')),
      apiGet(`/students/${id}/tickets`, localStorage.getItem('adminJwt')),
      apiGet(`/students/${id}/events`, localStorage.getItem('adminJwt')),
    ])
      .then(
        async (responses) => {
          const [
            student,
            teams,
            invites,
            tickets,
            events,
          ] = await Promise.all(responses.map(resp => resp.json()));

          this.setState({
            student,
            teams,
            invites,
            tickets,
            events,
            loading: false,
          });
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  render() {
    const { loading, student, teams, invites,
      tickets, events, error } = this.state;

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
        <Header as="h1">{student.user.preferredName} {student.user.lastName}</Header>
        <pre>{JSON.stringify(student, null, 4)}</pre>

        <Header as="h2">Teams</Header>
        <pre>{JSON.stringify(teams, null, 4)}</pre>

        <Header as="h2">Invites</Header>
        <pre>{JSON.stringify(invites, null, 4)}</pre>

        <Header as="h2">Tickets</Header>
        <pre>{JSON.stringify(tickets, null, 4)}</pre>

        <Header as="h2">Events</Header>
        <pre>{JSON.stringify(events, null, 4)}</pre>
      </Container>
    );
  }
}

export default AdminStudentDetails;
