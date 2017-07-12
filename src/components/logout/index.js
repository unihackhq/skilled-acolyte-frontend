import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as userActions, selectors as userSelectors } from '../../ducks/user';
import { Container, Header, Button } from 'semantic-ui-react';

class Logout extends Component {
  logout = (event) => {
    this.props.dispatch(userActions.logout());
  }

  render() {
    return (
      <Container>
        <Header as="h2">Logout</Header>
        {/* show logout if not logged out */}
        { this.props.loggedIn ? (
          <Container>
            <div>Are you sure you want to logout?</div>
            <Button onClick={this.logout}>Logout</Button>
          </Container>
        ) : (
          <Redirect to="/" />
        ) }
      </Container>
    );
  }
}

const stateMap = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
});

export default connect(stateMap)(Logout);
