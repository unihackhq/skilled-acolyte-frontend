import React from 'react';
import PropTypes from 'prop-types';

// TODO: make student specific UI
const Student = ({ student: s }) => (
  <pre>{JSON.stringify(s, null, 4)}</pre>
);
Student.propTypes = {
  student: PropTypes.object.isRequired,
};

export default Student;
