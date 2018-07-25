import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Message,
  MessageHeader,
  MessageBody,
  Button,
  Content,
} from 'bloomer';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import * as constant from '../../constants';
import './index.scss';

class ErrorMessage extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = { open: false };

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return (
      <Container>
        <Message isColor="danger">
          <MessageHeader>Something went wrong!</MessageHeader>
          <MessageBody>
            <Content>
              <p>Please refresh this page. If this issue persists please <a href={`mailto:${constant.SUPPORT_EMAIL}`}>contact us</a>.</p>
              <Button className="error-message__details" onClick={this.toggleOpen}>
                <span>Details</span>
                {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </Button>
              {open ? children : null}
            </Content>
          </MessageBody>
        </Message>
      </Container>
    );
  }
}

export default ErrorMessage;
