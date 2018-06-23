import React from 'react';
import { Container, Message, Loader, Accordion, Input } from 'semantic-ui-react';
import { apiGet } from '../../utils/api';
import Team from './Team';

class AdminTeams extends React.Component {
  state = {
    teams: null,
    error: null,
    loading: true,
    query: '',
  };

  componentDidMount() {
    apiGet('/teams', localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const teams = await resp.json();
          this.setState({ teams, loading: false });
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
    const { loading, teams, error, query } = this.state;

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
    // filter by team's name
    const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(queryLowered));

    const panels = filteredTeams.map(t => ({
      title: {
        key: `title-${t.id}`,
        content: t.name,
      },
      content: {
        key: `content-${t.id}`,
        content: <Team team={t} />,
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

export default AdminTeams;
