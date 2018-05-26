import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
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
  }

  logout = () => {
    const { history, user } = this.props;
    user.logout();
    history.push('/');
  }

  render() {
    const { loggedIn } = this.props.user;

    return (
      <Container>
        <Menu>
          <NavMenuItem key="home" path="/" label="Home" routeProps={{ exact: true }} />
          <Menu.Menu position="right">
            {loggedIn ? (
              <Menu.Item key="logout" name="logout" onClick={this.logout}>Logout</Menu.Item>
            ) : (
              <NavMenuItem key="login" path="/login" label="Login" />
            )}
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}


export default withRouter(inject('user')(observer(Nav)));
