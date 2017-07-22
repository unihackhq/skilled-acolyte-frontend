import React, { Component } from 'react';
import { Container, Message } from 'semantic-ui-react';

class Home extends Component {
  renderMessage = () => {
    let header, content;
    switch(this.props.location.hash) {
      case '#loggedout':
        header = 'Logged Out';
        content = 'You are now logged out!';
        break;

      case '#loggedin':
        header = 'Logged In';
        content = 'You are now logged in!';
        break;

      default:
        return null;
    }

    return (
      <Message
        success
        header={header}
        content={content}
      />
    );
  }

  render() {
    return (
      <Container>
        {this.renderMessage()}
        <p>Welcome 👋</p>
      </Container>
    );
  }
}

export default Home;
