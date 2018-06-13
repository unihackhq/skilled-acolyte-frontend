import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

// TODO: make team specific UI
const Team = ({ team: t }) => (
  <React.Fragment>
    <pre>{JSON.stringify(t, null, 4)}</pre>
    <Button as={Link} to={`/admin/teams/${t.id}`}>Details</Button>
  </React.Fragment>
);
Team.propTypes = {
  team: PropTypes.object.isRequired,
};

export default Team;
