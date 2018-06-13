import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

const Admin = () => (
  <Container>
    <Button as={Link} to="/admin/students">List of students</Button>
    <Button as={Link} to="/admin/teams">List of teams</Button>
    <Button as={Link} to="/admin/events">List of events</Button>
    <Button as={Link} to="/admin/tickets">List of tickets</Button>
  </Container>
);

export default Admin;
