import React from 'react';
import { Container, Message, MessageHeader, MessageBody, Field, Control, Label, Input } from 'bloomer';
import { Accordion, AccordionItem } from '../../Accordion';
import { apiGet } from '../../../utils/api';
import Team from './Team';
import Loader from '../../Loader';

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

  handleSearchChange = (event) => {
    this.setState({ query: event.target.value });
  }

  render() {
    const { loading, teams, error, query } = this.state;

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

    const queryLowered = query.toLowerCase();
    // filter by team's name
    const filteredTeams = teams.filter(t => t.name.toLowerCase().includes(queryLowered));

    return (
      <Container>
        <Field>
          <Label>Filter by name</Label>
          <Control>
            <Input value={query} onChange={this.handleSearchChange} />
          </Control>
        </Field>
        <Accordion>
          {filteredTeams.map(t => (
            <AccordionItem title={t.name} key={t.id}>
              <Team team={t} />
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    );
  }
}

export default AdminTeams;
