import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Message, MessageHeader, MessageBody, Field, Label, Control, Input, Button, TextArea, Title } from 'bloomer';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiPut } from '../../utils/api';

class EditTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
  }

  constructor(props) {
    super(props);

    const { teamId, teams } = props;
    const { name, shortDescription, devpostLink,
      stack, longDescription } = teams.findById(teamId);

    this.state = {
      name,
      shortDescription,
      devpostLink,
      stack,
      longDescription,
      saving: false,
      error: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { teamId, teams } = this.props;
    const { name, shortDescription, devpostLink,
      stack, longDescription } = this.state;

    this.setState({ saving: true });

    apiPut(`/teams/${teamId}`, {
      name,
      shortDescription,
      devpostLink,
      stack,
      longDescription,
    })
      .then(
        async () => {
          this.setState({ saving: false });
          teams.fetchList();
        },
        (error) => {
          this.setState({ error: error.body.message, saving: false });
        },
      );
  }

  handleChange = field =>
    (event) => {
      this.setState({ [field]: event.target.value || null });
    }

  handleNameChange = this.handleChange('name');
  handleDescChange = this.handleChange('shortDescription');
  handleDevpostLinkChange = this.handleChange('devpostLink');
  handleStackChange = this.handleChange('stack');
  handleLongDescChange = this.handleChange('longDescription');

  render() {
    const { saving, error, name, shortDescription,
      devpostLink, stack, longDescription } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {error ? (
          <Message isColor="danger">
            <MessageHeader>Something went wrong!</MessageHeader>
            <MessageBody>{error}</MessageBody>
          </Message>
        ) : null}
        <Title isSize={3} tag="h1">Edit Team Details</Title>
        <Field>
          <Label htmlFor="edit-team-name">Team Name</Label>
          <Control>
            <Input
              id="edit-team-name"
              type="text"
              value={name || ''}
              onChange={this.handleNameChange}
            />
          </Control>
        </Field>
        <Field>
          <Label htmlFor="edit-team-desc">Description</Label>
          <Control>
            <Input
              id="edit-team-desc"
              type="text"
              value={shortDescription || ''}
              onChange={this.handleDescChange}
            />
          </Control>
        </Field>
        <Field>
          <Label htmlFor="edit-team-devpost-link">Devpost Link</Label>
          <Control>
            <Input
              id="edit-team-devpost-link"
              type="text"
              value={devpostLink || ''}
              onChange={this.handleDevpostLinkChange}
            />
          </Control>
        </Field>
        <Field>
          <Label htmlFor="edit-team-stack">Tech Stack</Label>
          <Control>
            <Input
              id="edit-team-stack"
              value={stack || ''}
              onChange={this.handleStackChange}
            />
          </Control>
        </Field>
        <Field>
          <Label htmlFor="edit-team-long-desc">Long Description</Label>
          <Control>
            <TextArea
              id="edit-team-long-desc"
              value={longDescription || ''}
              onChange={this.handleLongDescChange}
            />
          </Control>
        </Field>
        <Field isGrouped>
          <Control>
            <Button
              type="submit"
              isColor="primary"
              isLoading={saving}
            >
              Save
            </Button>
          </Control>
          <Control>
            <Button
              render={props => <Link to="/team" {...props}>Cancel</Link>}
            />
          </Control>
        </Field>
      </form>
    );
  }
}

export default inject('teams')(observer(EditTeam));
