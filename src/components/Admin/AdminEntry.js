import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const AdminEntry = (props) => {
  const { token } = props.match.params;
  localStorage.setItem('adminJwt', token);

  return <Redirect to="/admin" />;
};
AdminEntry.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AdminEntry;
