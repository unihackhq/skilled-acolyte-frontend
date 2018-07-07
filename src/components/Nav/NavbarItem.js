import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import classNames from 'classnames';
import setTitle from '../../utils/title';

const NavbarItem = ({ path, className, children, ...routeProps }) => {
  const child = ({ match }) => {
    if (match) {
      setTitle(children);
    }

    return (
      <Link
        to={path}
        className={classNames(
          className,
          { active: Boolean(match) },
        )}
      >
        {children}
      </Link>
    );
  };
  child.propTypes = {
    match: PropTypes.string.isRequired,
  };

  return <Route {...routeProps} path={path}>{child}</Route>;
};
NavbarItem.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default withRouter(NavbarItem);
