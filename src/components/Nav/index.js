import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { reaction } from 'mobx';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container } from 'bloomer';
import NavbarItem from './NavbarItem';
import NavLogo from './NavLogo';
import './index.scss';

class Nav extends React.Component {
  static propTypes = {
    user: MobxPropTypes.observableObject.isRequired,
    invites: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { user, invites } = this.props;

    // fetch list when user logged in
    reaction(
      () => user.loggedIn,
      (loggedIn) => {
        if (loggedIn) {
          invites.fetchList();
        }
      },
      { fireImmediately: true },
    );
  }

  logout = () => {
    const { user } = this.props;
    user.logout();
  }

  render() {
    const { user, invites } = this.props;
    const { loggedIn } = user;
    const { count } = invites;
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
            <NavbarItem className="navbar__item" path="/" exact>
              Home
            </NavbarItem>

            {loggedIn ? [
              <NavbarItem className="navbar__item" key="team" path="/team">
                Team
              </NavbarItem>,
              <NavbarItem className="navbar__item" key="invites" path="/invites" title="Invites">
                Invites <div className="navbar__item__bubble">{count}</div>
              </NavbarItem>,
            ] : null}

            {isAdmin ? (
              <NavbarItem className="navbar__item" key="admin" path="/admin">
                Admin
              </NavbarItem>
            ) : null}
          </div>
        </Container>
      </div>
    );
  }
}


export default withRouter(inject('user', 'invites')(observer(Nav)));
