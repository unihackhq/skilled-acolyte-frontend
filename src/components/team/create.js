import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Form } from 'semantic-ui-react';

class CreateTeam extends Component {
  static propTypes = {
    creating: PropTypes.bool.isRequired,
    onCreate: PropTypes.func.isRequired
  }
  state = { active: false }

  handleClick = (event) => {
    this.setState({
      active: true
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onCreate(event.target.value);
  }

  render() {
    const { creating } = this.props;
    const { active } = this.state;

    if (active === false) {
      return (
        <div>
          <p>You don't have a group yet!</p>
          <Button primary onClick={this.handleClick}>Create a team</Button>
        </div>
      );
    }

    return (
      <div>
        <Header as="h2">Create a new team</Header>
        <Form>
          <Form.Group>
            <Form.Input inline placeholder="Team Name" />
            <Form.Button inline content="Create" onClick={this.handleSubmit} loading={creating} />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CreateTeam;
