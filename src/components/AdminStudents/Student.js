import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

// TODO: make student specific UI
const Student = ({ student: s }) => (
  <React.Fragment>
    <pre>{JSON.stringify(s, null, 4)}</pre>
    <Button as={Link} to={`/admin/students/${s.id}`}>Details</Button>
  </React.Fragment>
);
Student.propTypes = {
  student: PropTypes.object.isRequired,
};

export default Student;
