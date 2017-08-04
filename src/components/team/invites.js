import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message, Button, Icon, List, Loader } from 'semantic-ui-react';
import { actions as inviteActions, selectors as inviteSelectors } from '../../ducks/invite';

class TeamInvites extends Component {
  static propTypes = {
    hasTeam: PropTypes.bool.isRequired
  }

  componentWillMount() {
    this.props.fetchInvites();
  }

  handleAccept(id, event) {
    this.props.accept(id);
  }

  handleIgnore(id, event) {
    this.props.ignore(id);
  }

  renderButtons({ id, accepting, ignoring }) {
    const { hasTeam } = this.props;

    return (
      <div>
        <Button positive size="tiny" loading={accepting} disabled={hasTeam || ignoring} onClick={(e) => this.handleAccept(id, e)}>
          <Icon name="checkmark" /> Accept
        </Button>
        <Button negative size="tiny" loading={ignoring} disabled={accepting} onClick={(e) => this.handleIgnore(id, e)}>
          <Icon name="remove" /> Ignore
        </Button>
      </div>
    );
  }

  render() {
    const { loading, hasTeam, invites } = this.props;

    if (loading === true) {
      return <Loader active inline="centered" size="mini" />;
    }

    if (invites === null || invites.length === 0) {
      return null;
    }

    if (invites.length === 1) {
      const invite = invites[0];
      return (
        <Message>
          <Message.Header>Team Invitation</Message.Header>
          <p>You have an invite from <b>{invite.teamName}</b>. Do you want to accept?</p>
          {hasTeam && <p>If you want to accept you must leave your current team first!</p>}
          {this.renderButtons(invite)}
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
            (invite) => (
              <List.Item key={invite.id}>
                <p>Invite from: <b>{invite.teamName}</b></p>
                {this.renderButtons(invite)}
              </List.Item>
            )
          )}
        </List>
      </Message>
    );
  }
}

const stateMap = (state) => ({
  loading: inviteSelectors.isLoading(state),
  invites: inviteSelectors.invites(state)
});

const actionMap = (dispatch) => ({
  fetchInvites: (state) => dispatch(inviteActions.fetch()),
  accept: (id) => dispatch(inviteActions.accept(id)),
  ignore: (id) => dispatch(inviteActions.ignore(id))
});

export default connect(stateMap, actionMap)(TeamInvites);
