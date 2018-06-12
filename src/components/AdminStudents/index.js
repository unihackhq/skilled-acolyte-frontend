import React from 'react';
import { Container, Message, Loader, Accordion, Input } from 'semantic-ui-react';
import { apiGet } from '../../utils/api';
import Student from './Student';

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

  handleSearchChange = (e, data) => {
    this.setState({ query: data.value });
  }

  render() {
    const { loading, students, error, query } = this.state;

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
    // filter by user's name or email
    const filteredStudents = students.filter(s =>
      `${s.user.preferredName} ${s.user.lastName}`.toLowerCase().includes(queryLowered)
      || s.user.email.toLowerCase().includes(queryLowered));

    const panels = filteredStudents.map(s => ({
      title: {
        key: `title-${s.id}`,
        content: `${s.user.preferredName} ${s.user.lastName} (${s.user.email})`,
      },
      content: {
        key: `content-${s.id}`,
        content: <Student student={s} />,
      },
    }));

    return (
      <Container>
        <Input focus placeholder="Filter by name or email..." value={query} onChange={this.handleSearchChange} />
        <Accordion styled fluid panels={panels} />
      </Container>
    );
  }
}

export default AdminStudents;
