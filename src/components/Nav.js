import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { setTitle } from '../utils';
import { Container, Menu } from 'semantic-ui-react';

const NavMenuItem = ({ path, label, routeProps }) => (
  <Route
    {...routeProps}
    path={path}
    children={({ history, match }) => {
      if (match !== null) {
        setTitle(label);
      }

      return (
        <Menu.Item
          name={path}
          active={match !== null}
          onClick={() => history.push(path)}
        >
          {label}
        </Menu.Item>
      );
    }}
  />
);

class Nav extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  logout = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const loggedIn = false;

    return (
      <Container>
        <Menu>
          <NavMenuItem key="home" path="/" label="Home" routeProps={{exact: true}} />
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


export default withRouter(Nav);
