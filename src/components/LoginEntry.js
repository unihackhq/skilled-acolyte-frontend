import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

class LoginEntry extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  render() {
    // return <Redirect to="/" />;
    return <Loader active inline="centered" />;
  }
}
export default LoginEntry;
