import React from 'react';
import PropTypes from 'prop-types';

// TODO: make event specific UI
const Event = ({ event: e }) => (
  <pre>{JSON.stringify(e, null, 4)}</pre>
);
Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
