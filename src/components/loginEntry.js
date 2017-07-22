import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { actions as userActions } from '../ducks/user';

class LoginEntry extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  componentWillMount() {
    const { login, match } = this.props;
    login(match.params.token);
  }

  render() {
    return <Redirect to="/#loggedin" />;
  }
}

const stateMap = () => ({});

const actionMap = (dispatch) => ({
  login: (token) => dispatch(userActions.login(token))
});

export default connect(stateMap, actionMap)(LoginEntry);
