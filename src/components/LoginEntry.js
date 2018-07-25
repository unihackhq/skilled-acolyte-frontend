import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Message, MessageHeader, MessageBody } from 'bloomer';
import Loader from './Loader';
import Page from './Page';

class LoginEntry extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    user: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { user, match } = this.props;
    const { token } = match.params;
    user.login(token);
  }

  render() {
    const { loggedIn, error } = this.props.user;

    if (loggedIn) {
      return <Redirect to="/" />;
    }
    if (error) {
      return (
        <Page>
          <Message isColor="danger">
            <MessageHeader>Something went wrong!</MessageHeader>
            <MessageBody>{error}</MessageBody>
          </Message>
        </Page>
      );
    }

    return <Loader />;
  }
}
export default inject('user')(observer(LoginEntry));
