import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Form, Message } from 'semantic-ui-react';
import { apiPost } from '../../utils/api';

class CreateTeam extends React.Component {
  static propTypes = {
    teams: MobxPropTypes.observableObject.isRequired,
    eventId: PropTypes.string.isRequired,
  }

  state = {
    name: '',
    desc: '',
    loading: false,
    error: null,
  }

  handleDescChange = (e, data) => {
    this.setState({ desc: data.value });
  }

  handleNameChange = (e, data) => {
    this.setState({ name: data.value });
  }

  handleCreate = () => {
    const { name, desc } = this.state;
    const { eventId, teams } = this.props;

    this.setState({ loading: true });

    apiPost('/teams', {
      name,
      description: desc,
      eventId,
    })
      .then(
        async (resp) => {
          const team = await resp.json();
          this.setState({ loading: false });
          teams.append(team);
        },
        (error) => {
          this.setState({ error: error.body.message, loading: false });
        },
      );
  }

  render() {
    const { name, desc, loading, error } = this.state;

    return (
      <div>
        {error ? (
          <Message
            compact
            negative
            header="Something went wrong!"
            content={error}
          />
        ) : null}
        <Form>
          <Form.Input
            id="create-team-name"
            label="Team Name"
            placeholder="Name..."
            value={name}
            onChange={this.handleNameChange}
          />
          <Form.Input
            id="create-team-desc"
            label="Description"
            placeholder="Short description for your team..."
            value={desc}
            onChange={this.handleDescChange}
          />
          <Form.Button
            content="Confirm"
            onClick={this.handleCreate}
            loading={loading}
            disabled={loading}
          />
        </Form>
      </div>
    );
  }
}

export default inject('teams')(observer(CreateTeam));
