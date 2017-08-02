import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { actions as userActions, selectors as userSelectors } from '../ducks/user';

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
    const { loading, loggedIn } = this.props;
    // make sure is not loading (wait for user info to load before redirecting to home page)
    if (loading === false && loggedIn === true) {
      return <Redirect to="/#loggedin" />;
    }
    return <Loader active inline="centered" />;
  }
}

const stateMap = (state) => ({
  loading: userSelectors.isLoading(state),
  loggedIn: userSelectors.isLoggedIn(state)
});

const actionMap = (dispatch) => ({
  login: (token) => dispatch(userActions.login(token))
});

export default connect(stateMap, actionMap)(LoginEntry);
