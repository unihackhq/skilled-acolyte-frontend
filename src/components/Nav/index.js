import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, NavbarBurger } from 'bloomer';
import classNames from 'classnames';
import NavbarItem from './NavbarItem';
import NavLogo from './NavLogo';
import './index.scss';

class Nav extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  }

  state = {
    open: false,
  }

  logout = () => {
    const { user } = this.props;
    user.logout();
  }

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  mobileLogout = () => {
    this.toggleOpen();
    this.logout();
  }

  render() {
    const { open } = this.state;
    const { user } = this.props;
    const { loggedIn } = user;
    const isAdmin = localStorage.getItem('adminJwt') !== null;
    const itemProps = {
      className: 'navbar__item',
      onClick: this.toggleOpen,
    };

    return (
      <div className="navbar__root">
        <Container className="navbar__container">
          <div className="navbar__brand">
            <div className="navbar__logo">
              <NavLogo />
            </div>
            <div className="navbar__user">
              {loggedIn ? (
                <React.Fragment>
                  <Link className="button is-light is-hidden-mobile" to="/" onClick={this.logout}>
                    Logout
                  </Link>
                  <NavbarBurger className="is-hidden-tablet" isActive={open} onClick={this.toggleOpen} />
                </React.Fragment>
              ) : (
                <Link className="button is-light" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className={classNames('navbar__nav', { 'is-active': open })}>
            <NavbarItem path="/" title="Home" exact {...itemProps}>
              Home
            </NavbarItem>

            {loggedIn ? (
              <React.Fragment>
                <NavbarItem path="/schedule" title="Schedule" {...itemProps}>
                  Schedule
                </NavbarItem>
                <NavbarItem path="/profile" title="Profile" {...itemProps}>
                  Profile
                </NavbarItem>
                <NavbarItem path="/team" title="Team" {...itemProps}>
                  Team
                </NavbarItem>
                <NavbarItem path="/event" title="Event" {...itemProps}>
                  Event
                </NavbarItem>
                <Link className="button is-light is-hidden-tablet" to="/" onClick={this.mobileLogout}>
                  Logout
                </Link>
              </React.Fragment>
            ) : null}

            {isAdmin ? (
              <NavbarItem path="/admin" title="Admin" {...itemProps}>
                Admin
              </NavbarItem>
            ) : null}
          </div>
          {/* Additional navbar items when admin page is open */}
          <Route
            path="/admin"
            render={() => (
              <div className={classNames('navbar__nav navbar__nav__admin', { 'is-active': open })}>
                <NavbarItem path="/admin/students" exact {...itemProps}>
                  Students
                </NavbarItem>
                <NavbarItem path="/admin/teams" exact {...itemProps}>
                  Teams
                </NavbarItem>
                <NavbarItem path="/admin/events" exact {...itemProps}>
                  Events
                </NavbarItem>
                <NavbarItem path="/admin/tickets" exact {...itemProps}>
                  Tickets
                </NavbarItem>
              </div>
            )}
          />
        </Container>
      </div>
    );
  }
}

export default withRouter(inject('user')(observer(Nav)));
