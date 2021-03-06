import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'bloomer';

// TODO: make ticket specific UI
const Ticket = ({ ticket: t }) => (
  <React.Fragment>
    <pre>{JSON.stringify(t, null, 4)}</pre>
    <Button
      render={props => <Link to={`/admin/tickets/${t.id}`} {...props}>Details</Link>}
    />
  </React.Fragment>
);
Ticket.propTypes = {
  ticket: PropTypes.object.isRequired,
};

export default Ticket;
