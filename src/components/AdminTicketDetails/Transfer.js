import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Input } from 'semantic-ui-react';
import { apiPost } from '../../utils/api';

class TicketTransfer extends React.Component {
  static propTypes = {
    ticketId: PropTypes.string.isRequired,
  }

  state = {
    email: '',
    transfering: false,
    open: false,
  }

  handleEmailChange = (e, data) => {
    this.setState({ email: data.value });
  }

  handleSend = () => {
    const { open, email } = this.state;
    const { ticketId } = this.props;

    if (!open) {
      this.setState({ open: true });
      return;
    }

    this.setState({ transfering: true });

    apiPost(`/tickets/${ticketId}/transfer`, { email }, localStorage.getItem('adminJwt'))
      .then(
        async () => {
          this.setState({ transfering: false });
        },
        (error) => {
          this.setState({ error: error.body.message, transfering: false });
        },
      );
  }

  render() {
    const { open, transfering, error, email } = this.state;

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
        {open ? (
          <Input
            placeholder="Destination email"
            fluid
            onChange={this.handleEmailChange}
            value={email}
          />
        ) : null}
        <Form.Button
          onClick={this.handleSend}
          disabled={(open && email.length === 0) || transfering}
          loading={transfering}
        >
          Transfer
        </Form.Button>
      </Form>
    );
  }
}

export default TicketTransfer;
