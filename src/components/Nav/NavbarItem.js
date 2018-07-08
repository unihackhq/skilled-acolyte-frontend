import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';
import classNames from 'classnames';
import setTitle from '../../utils/title';

const NavbarItem = ({ path, className, children, title, ...routeProps }) => {
  const child = ({ match }) => {
    if (match) {
      const titleText = title || children;
      setTitle(titleText);
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
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};
NavbarItem.defaultProps = {
  title: null,
};

export default withRouter(NavbarItem);
