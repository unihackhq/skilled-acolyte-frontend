import React from 'react';
import {
  Container,
  Message,
  MessageHeader,
  MessageBody,
  Field,
  Control,
  Label,
  Input,
  Button,
} from 'bloomer';
import Papa from 'papaparse';
import FileSaver from 'file-saver';
import { Accordion, AccordionItem } from '../../Accordion';
import { apiGet } from '../../../utils/api';
import Team from './Team';
import Loader from '../../Loader';
import './index.scss';

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

  downloadCsv = () => {
    const { teams } = this.state;

    const data = teams.map(t => ({
      Name: t.name,
      Description: t.shortDescription,
      Stack: t.stack,
      LongDescription: t.longDescription,
      Devpost: t.devpostLink,
      Members: t.members.map(s => `${s.user.preferredName} ${s.user.lastName}`).join(', '),
    }));

    const csv = Papa.unparse(data);

    const file = new Blob([csv], { type: 'text/csv' });
    FileSaver.saveAs(file, 'teams.csv');
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
        <div className="admin-teams__row">
          <Field className="admin-teams__search">
            <Label>Filter by name</Label>
            <Control>
              <Input value={query} onChange={this.handleSearchChange} />
            </Control>
          </Field>
          <div className="admin-teams__actions">
            <Button onClick={this.downloadCsv}>Download CSV</Button>
          </div>
        </div>
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
