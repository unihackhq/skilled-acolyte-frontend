import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message } from 'semantic-ui-react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { apiPut } from '../../utils/api';

class TeamDetails extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    teams: MobxPropTypes.observableObject.isRequired,
    onFinish: PropTypes.func.isRequired,
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

  handleSave = () => {
    const { teamId, teams, onFinish } = this.props;
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
          onFinish();
          teams.fetchList();
        },
        (error) => {
          this.setState({ error: error.body.message, saving: false });
        },
      );
  }

  handleChange = field =>
    (event, data) => {
      this.setState({ [field]: data.value || null });
    }

  handleNameChange = this.handleChange('name');
  handleDescChange = this.handleChange('shortDescription');
  handleDevpostLinkChange = this.handleChange('devpostLink');
  handleStackChange = this.handleChange('stack');
  handleLongDescChange = this.handleChange('longDescription');

  render() {
    const { saving, error, name, shortDescription,
      devpostLink, stack, longDescription } = this.state;

    if (error) {
      return (
        <Message
          compact
          negative
          header="Something went wrong!"
          content={error}
        />
      );
    }

    return (
      <Form>
        <Form.Input
          id="edit-team-name"
          label="Team Name"
          placeholder="Name..."
          value={name || ''}
          onChange={this.handleNameChange}
        />
        <Form.Input
          id="edit-team-desc"
          label="Description"
          placeholder="Short description for your team..."
          value={shortDescription || ''}
          onChange={this.handleDescChange}
        />
        <Form.Input
          id="edit-team-devpost-link"
          type="url"
          label="Devpost link"
          placeholder="Link to your devpost"
          value={devpostLink || ''}
          onChange={this.handleDevpostLinkChange}
        />
        <Form.Input
          id="edit-team-stack"
          label="Stack"
          placeholder="Tech stack you're using..."
          value={stack || ''}
          onChange={this.handleStackChange}
        />
        <Form.TextArea
          id="edit-team-long-desc"
          label="Long description"
          placeholder="Talk about what you're doing here..."
          value={longDescription || ''}
          onChange={this.handleLongDescChange}
        />
        <Form.Button
          content="Save"
          onClick={this.handleSave}
          loading={saving}
          disabled={saving}
        />
      </Form>
    );
  }
}

export default inject('teams')(observer(TeamDetails));
