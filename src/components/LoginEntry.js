import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

class LoginEntry extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  componentDidMount() {
    const { user, match } = this.props;
    const { token } = match.params;
    user.login(token);
  }

  render() {
    const { user } = this.props;
    const { loggedIn } = user;

    if (loggedIn) {
      return <Redirect to="/" />;
    }
    return <Loader active inline="centered" />;
  }
}
export default inject('user')(observer(LoginEntry));
