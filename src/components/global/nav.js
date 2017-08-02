import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { selectors as userSelectors } from '../../ducks/user';
import { setTitle } from '../../utils';
import { Container, Menu } from 'semantic-ui-react';

class SmartMenuItem extends React.Component {
  render() {
    const { path, name, routeProps } = this.props;

    return (
      <Route {...routeProps} path={path} children={
        ({ history, match }) => {
          if (match !== null) {
            setTitle(name);
          }

          return (
            <Menu.Item
              name={path}
              active={match !== null}
              onClick={() => history.push(path)}
            >
              {name}
            </Menu.Item>
          );
        }
      } />
    );
  }
}

class Nav extends React.Component {
  render() {
    const { loggedIn } = this.props;

    return (
      <Container>
        <Menu>
          <SmartMenuItem key="home" path="/" name="Home" routeProps={{exact: true}} />
          { loggedIn ? [
            <SmartMenuItem key="team" path="/team" name="My Team" />,
            <SmartMenuItem key="logout" path="/logout" name="Logout" />
          ] : [
            <SmartMenuItem key="login" path="/login" name="Login" />
          ] }
        </Menu>
      </Container>
    );
  }
}

const mapState = (state) => ({
  loggedIn: userSelectors.isLoggedIn(state)
});

export default withRouter(connect(
  mapState
)(Nav));
