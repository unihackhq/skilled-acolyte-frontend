import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'bloomer';

// TODO: make team specific UI
const Team = ({ team: t }) => (
  <React.Fragment>
    <pre>{JSON.stringify(t, null, 4)}</pre>
    <Button
      render={props => <Link to={`/admin/teams/${t.id}`} {...props}>Details</Link>}
    />
  </React.Fragment>
);
Team.propTypes = {
  team: PropTypes.object.isRequired,
};

export default Team;
