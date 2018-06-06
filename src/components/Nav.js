import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { reaction } from 'mobx';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Menu } from 'semantic-ui-react';
import setTitle from '../utils/title';

const NavMenuItem = ({ path, label, routeProps }) => {
  const child = ({ history, match }) => {
    if (match) {
      setTitle(label);
    }

    return (
      <Menu.Item
        name={path}
        active={Boolean(match)}
        onClick={() => history.push(path)}
      >
        {label}
      </Menu.Item>
    );
  };
  child.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.string.isRequired,
  };

  return <Route {...routeProps} path={path}>{child}</Route>;
};
NavMenuItem.propTypes = {
  path: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  routeProps: PropTypes.object,
};
NavMenuItem.defaultProps = {
  routeProps: {},
};

class Nav extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: MobxPropTypes.observableObject.isRequired,
    invites: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { user, invites } = this.props;

    if (!user.loggedIn) {
      // setup a one time reaction for when user logs in
      reaction(
        () => user.loggedIn,
        (loggedIn, self) => {
          invites.fetchList();

          // removes the reaction so this only runs once
          self.dispose();
        },
      );
    }
  }

  logout = () => {
    const { history, user } = this.props;
    user.logout();
    history.push('/');
  }

  render() {
    const { user, invites } = this.props;
    const { loggedIn } = user;
    const { count } = invites;

    return (
      <Container>
        <Menu>
          <NavMenuItem key="home" path="/" label="Home" routeProps={{ exact: true }} />

          {loggedIn && [
            <NavMenuItem key="team" path="/team" label="Team" />,
            <NavMenuItem key="invites" path="/invites" label={`Invites (${count})`} />,
          ]}

          <Menu.Menu position="right">
            {loggedIn ? (
              <Menu.Item name="logout" onClick={this.logout}>Logout</Menu.Item>
            ) : (
              <NavMenuItem path="/login" label="Login" />
            )}
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}


export default withRouter(inject('user', 'invites')(observer(Nav)));
