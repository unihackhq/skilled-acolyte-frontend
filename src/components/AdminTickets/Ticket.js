import React from 'react';
import PropTypes from 'prop-types';

// TODO: make ticket specific UI
const Ticket = ({ ticket: t }) => (
  <pre>{JSON.stringify(t, null, 4)}</pre>
);
Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default Ticket;
