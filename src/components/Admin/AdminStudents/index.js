import React from 'react';
import { Container, Message, MessageHeader, MessageBody, Field, Control, Label, Input } from 'bloomer';
import { Accordion, AccordionItem } from '../../Accordion';
import { apiGet } from '../../../utils/api';
import Student from './Student';
import Loader from '../../Loader';

class AdminStudents extends React.Component {
  state = {
    students: null,
    error: null,
    loading: true,
    query: '',
  };

  componentDidMount() {
    apiGet('/students', localStorage.getItem('adminJwt'))
      .then(
        async (resp) => {
          const students = await resp.json();
          this.setState({ students, loading: false });
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
    const { loading, students, error, query } = this.state;

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
    // filter by user's name or email
    const filteredStudents = students.filter(s =>
      `${s.user.preferredName} ${s.user.lastName}`.toLowerCase().includes(queryLowered)
      || s.user.email.toLowerCase().includes(queryLowered));

    return (
      <Container>
        <Field>
          <Label>Filter by name or email</Label>
          <Control>
            <Input value={query} onChange={this.handleSearchChange} />
          </Control>
        </Field>
        <Accordion>
          {filteredStudents.map(s => (
            <AccordionItem
              title={(
                <span>
                  {s.user.preferredName} {s.user.lastName}
                  <br />
                  <small>{s.user.email}</small>
                </span>
              )}
              key={s.id}
            >
              <Student student={s} />
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    );
  }
}

export default AdminStudents;
