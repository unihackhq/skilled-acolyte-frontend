import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container } from 'bloomer';
import NavbarItem from './NavbarItem';
import NavLogo from './NavLogo';
import './index.scss';

class Nav extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
  }

  logout = () => {
    const { user } = this.props;
    user.logout();
  }

  render() {
    const { user } = this.props;
    const { loggedIn } = user;
    const isAdmin = localStorage.getItem('adminJwt') !== null;

    return (
      <div className="navbar__root">
        <Container className="navbar__container">
          <div className="navbar__brand">
            <div className="navbar__logo">
              <NavLogo />
            </div>
            <div className="navbar__user">
              {loggedIn ? (
                <Link className="button is-light" to="/" onClick={this.logout}>
                  Logout
                </Link>
              ) : (
                <Link className="button is-light" to="/login">
                  Login
                </Link>
              )}
            </div>
          </div>
          <div className="navbar__nav">
            <NavbarItem className="navbar__item" path="/" title="Home" exact>
              Home
            </NavbarItem>

            {loggedIn ? (
              <React.Fragment>
                <NavbarItem className="navbar__item" path="/profile" title="Profile">
                  Profile
                </NavbarItem>
                <NavbarItem className="navbar__item" path="/team" title="Team">
                  Team
                </NavbarItem>
              </React.Fragment>
            ) : null}

            {isAdmin ? (
              <NavbarItem className="navbar__item" path="/admin" title="Admin">
                Admin
              </NavbarItem>
            ) : null}
          </div>
          {/* Additional navbar items when admin page is open */}
          <Route
            path="/admin"
            render={() => (
              <div className="navbar__nav navbar__nav__admin">
                <NavbarItem className="navbar__item" path="/admin/students" exact>
                  Students
                </NavbarItem>
                <NavbarItem className="navbar__item" path="/admin/teams" exact>
                  Teams
                </NavbarItem>
                <NavbarItem className="navbar__item" path="/admin/events" exact>
                  Events
                </NavbarItem>
                <NavbarItem className="navbar__item" path="/admin/tickets" exact>
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
