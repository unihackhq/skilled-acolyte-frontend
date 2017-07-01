import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions as userActions, selectors as userSelectors } from '../../ducks/user';
import { setTitle } from '../../utils';
import { Container, Header, Button } from 'semantic-ui-react';

class Logout extends Component {
  componentWillMount() {
    setTitle('Logout');
  }

  logout = (event) => {
    event.preventDefault();

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
            <Button type="submit" onClick={this.logout}>Logout</Button>
          </Container>
        ) : (
          <div>You have been successfully logged out</div>
        ) }
      </Container>
    );
  }
}

const stateMap = (state) => ({
  loggedIn: userSelectors.loggedIn(state)
});

export default connect(stateMap)(Logout);
