import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Container, Loader, Message } from 'semantic-ui-react';

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
        <Container>
          <Message compact>
            <Message.Header>Something went wrong</Message.Header>
            {error}
          </Message>
        </Container>
      );
    }
    return <Loader active inline="centered" />;
  }
}
export default inject('user')(observer(LoginEntry));
