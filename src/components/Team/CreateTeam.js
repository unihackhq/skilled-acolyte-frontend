import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Message, MessageHeader, MessageBody, Field, Label, Control, Input, Button } from 'bloomer';
import { apiPost } from '../../utils/api';

class CreateTeam extends React.Component {
  static propTypes = {
    teams: MobxPropTypes.observableObject.isRequired,
    events: MobxPropTypes.observableObject.isRequired,
  }

  state = {
    name: '',
    desc: '',
    loading: false,
    error: null,
  }

  handleDescChange = (event) => {
    this.setState({ desc: event.target.value });
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, desc } = this.state;
    const { events, teams } = this.props;

    this.setState({ loading: true });

    apiPost('/teams', {
      name,
      shortDescription: desc,
      eventId: events.selected.id,
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
      <React.Fragment>
        {error ? (
          <Message isColor="danger" isFullWidth={false}>
            <MessageHeader>
              Something went wrong!
            </MessageHeader>
            <MessageBody>
              {error}
            </MessageBody>
          </Message>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <Field>
            <Label htmlFor="create-team-name">Team Name</Label>
            <Control>
              <Input
                id="create-team-name"
                type="text"
                value={name}
                onChange={this.handleNameChange}
              />
            </Control>
          </Field>
          <Field>
            <Label htmlFor="create-team-desc">Description</Label>
            <Control>
              <Input
                id="create-team-desc"
                type="text"
                value={desc}
                onChange={this.handleDescChange}
              />
            </Control>
          </Field>
          <Field>
            <Control>
              <Button
                type="submit"
                isColor="primary"
                isLoading={loading}
              >
                Create
              </Button>
            </Control>
          </Field>
        </form>
      </React.Fragment>
    );
  }
}

export default inject('teams', 'events')(observer(CreateTeam));
