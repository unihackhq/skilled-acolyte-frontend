import React from 'react';
import PropTypes from 'prop-types';
import { Container, Message, MessageHeader, MessageBody, Title } from 'bloomer';
import { apiGet } from '../../utils/api';
import Loader from '../Loader';

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
        <Title tag="h1">{student.user.preferredName} {student.user.lastName}</Title>
        <pre>{JSON.stringify(student, null, 4)}</pre>

        <Title tag="h2">Teams</Title>
        <pre>{JSON.stringify(teams, null, 4)}</pre>

        <Title tag="h2">Invites</Title>
        <pre>{JSON.stringify(invites, null, 4)}</pre>

        <Title tag="h2">Tickets</Title>
        <pre>{JSON.stringify(tickets, null, 4)}</pre>

        <Title tag="h2">Events</Title>
        <pre>{JSON.stringify(events, null, 4)}</pre>
      </Container>
    );
  }
}

export default AdminStudentDetails;
