import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message, Button, Icon, List } from 'semantic-ui-react';
import { selectors as inviteSelectors } from '../../ducks/invite';
import * as smartActions from '../../ducks/smartActions';

class TeamInvites extends Component {
  static propTypes = {
    hasTeam: PropTypes.bool.isRequired
  }

  componentWillMount() {
    const { state, smartFetch } = this.props;
    smartFetch(state);
  }

  handleAccept(id, event) {

  }

  handleIgnore(id, event) {

  }

  renderButtons(id) {
    const { hasTeam } = this.props;

    return (
      <div>
        <Button positive size="tiny" disabled={hasTeam} onClick={(e) => this.handleAccept(id, e)}>
          <Icon name="checkmark" /> Accept
        </Button>
        <Button negative size="tiny" onClick={(e) => this.handleIgnore(id, e)}>
          <Icon name="remove" /> Ignore
        </Button>
      </div>
    );
  }

  render() {
    const { hasTeam, invites } = this.props;
    if (invites === null) {
      return null;
    }

    if (invites.length === 1) {
      const { id, teamName } = invites[0];
      return (
        <Message>
          <Message.Header>Team Invitation</Message.Header>
          <p>You have an invite from <b>{teamName}</b>. Do you want to accept?</p>
          {hasTeam && <p>If you want to accept you must leave your current team first!</p>}
          {this.renderButtons(id)}
        </Message>
      );
    }

    return (
      <Message>
        <Message.Header>Team Invitation</Message.Header>
        <p>You have invites from multiple teams.</p>
        {hasTeam && <p>If you want to accept you must leave your current team first!</p>}
        <List divided relaxed>
          {invites.map(
            ({ id, teamName }) => (
              <List.Item key={id}>
                <p>Invite from: <b>{teamName}</b></p>
                {this.renderButtons(id)}
              </List.Item>
            )
          )}
        </List>
      </Message>
    );
  }
}

const stateMap = (state) => ({
  invites: inviteSelectors.invites(state),
  state,
});

const actionMap = (dispatch) => ({
  smartFetch: (state) => smartActions.fetchInvite(dispatch, state)
});

export default connect(stateMap, actionMap)(TeamInvites);
