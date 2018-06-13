import React from 'react';
import PropTypes from 'prop-types';

// TODO: make team specific UI
const Team = ({ team: t }) => (
  <pre>{JSON.stringify(t, null, 4)}</pre>
);
Team.propTypes = {
  team: PropTypes.object.isRequired,
};

export default Team;
