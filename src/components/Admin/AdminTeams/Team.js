import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'bloomer';

// TODO: make team specific UI
const Team = ({ team: t }) => (
  <React.Fragment>
    <p><b>Name</b></p>
    <p className="margin-bottom">{t.name}</p>

    <p><b>Description</b></p>
    <p className="margin-bottom">{t.description}</p>

    <p><b>Stack</b></p>
    <p className="margin-bottom">{t.stack}</p>

    <p><b>Long Description</b></p>
    <p className="margin-bottom">{t.longDescription}</p>

    <p><b>Devpost Link</b></p>
    <p className="margin-bottom"><a href={t.devpostLink}>{t.devpostLink}</a></p>

    <div className="margin-bottom">
      <p><b>Members</b></p>
      {t.members.map(s => <p key={s.id}>{s.user.preferredName} {s.user.lastName}</p>)}
    </div>

    <Button
      render={props => <Link to={`/admin/teams/${t.id}`} {...props}>Details</Link>}
    />
  </React.Fragment>
);
Team.propTypes = {
  team: PropTypes.object.isRequired,
};

export default Team;
