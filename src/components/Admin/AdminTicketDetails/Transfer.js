import React from 'react';
import PropTypes from 'prop-types';
import { Notification, Control, Label, Input, Button } from 'bloomer';
import { apiPost } from '../../../utils/api';

class TicketTransfer extends React.Component {
  static propTypes = {
    ticketId: PropTypes.string.isRequired,
    refresh: PropTypes.func,
  }

  static defaultProps = {
    refresh: () => {},
  }

  state = {
    email: '',
    transfering: false,
    transferred: false,
    open: false,
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email } = this.state;
    const { ticketId, refresh } = this.props;

    this.setState({ transfering: true });

    apiPost(`/tickets/${ticketId}/transfer`, { email }, localStorage.getItem('adminJwt'))
      .then(
        async () => {
          this.setState({
            transfering: false,
            email: '',
            open: false,
            transferred: true,
          });
          refresh();
        },
        (error) => {
          this.setState({ error: error.body.message, transfering: false });
        },
      );
  }

  render() {
    const { open, transfering, transferred, error, email } = this.state;

    if (error) {
      return (
        <Notification isColor="danger">
          {error}
        </Notification>
      );
    }

    if (!open) {
      return (
        <Button onClick={this.handleOpen} isColor={transferred ? 'success' : ''}>
          {transferred ? 'Transferred' : 'Transfer'}
        </Button>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <Control>
          <Label htmlFor="transfer-email">Search for a student</Label>
          <Input
            id="transfer-email"
            type="text"
            value={email}
            onChange={this.handleChange}
          />
        </Control>
        <Button
          type="submit"
          disabled={transfering || email.length === 0}
          isLoading={transfering}
        >
          Transfer
        </Button>
        <Button onClick={this.handleClose}>
          Cancel
        </Button>
      </form>
    );
  }
}

export default TicketTransfer;
