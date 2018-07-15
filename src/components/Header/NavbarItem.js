import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import setTitle from '../../utils/title';

const NavbarItem = ({ path, className, children, title, ...routeProps }) => {
  // use isActive as an opportunity to change the title to the active item
  const isActive = (match) => {
    if (match && title) {
      setTitle(title);
    }

    return match;
  };

  return (
    <NavLink
      to={path}
      className={className}
      activeClassName="active"
      isActive={isActive}
      {...routeProps}
    >
      {children}
    </NavLink>
  );
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

export default NavbarItem;
