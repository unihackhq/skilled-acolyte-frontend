import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'bloomer';

// TODO: make event specific UI
const Event = ({ event: e }) => (
  <React.Fragment>
    <pre>{JSON.stringify(e, null, 4)}</pre>
    <Button
      render={props => <Link to={`/admin/events/${e.id}`} {...props}>Details</Link>}
    />
  </React.Fragment>
);
Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
