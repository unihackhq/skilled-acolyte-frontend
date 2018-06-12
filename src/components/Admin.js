import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react';

const Admin = () => (
  <Container>
    <Button as={Link} to="/admin/students">List of students</Button>
  </Container>
);

export default Admin;
