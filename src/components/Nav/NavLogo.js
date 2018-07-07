import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
const NavLogo = ({ events }) => {
  return (
    <React.Fragment>
      <Link to="/">
        <img src="/img/logo-melb.png" alt="Logo" />
      </Link>
      <span className="is-size-4">Melbourne</span>
    </React.Fragment>
  );
};
NavLogo.propTypes = {
  events: MobxPropTypes.observableObject.isRequired,
};

export default inject('events')(observer(NavLogo));
