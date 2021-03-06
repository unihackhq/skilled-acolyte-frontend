import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Button, Content, Title } from 'bloomer';
import Loader from '../Loader';
import Page from '../Page';
import * as contstant from '../../constants';
import './index.scss';

class LoginEntry extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        token: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    user: MobxPropTypes.observableObject.isRequired,
  }

  constructor(props) {
    super(props);

    // detect ios (wondering why the MSStream? cause fucking MS https://bit.ly/2LmlUhD)
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    this.state = { ios };
  }

  componentDidMount() {
    const { ios } = this.state;
    if (!ios) {
      this.login();
    }
  }

  login = () => {
    const { user, match } = this.props;
    const { token } = match.params;
    user.login(token);
  }

  render() {
    const { ios } = this.state;
    const { user, match } = this.props;
    const { loggedIn, details } = user;
    const { token } = match.params;

    if (loggedIn && !details.firstLaunch) {
      return <Redirect to="/" />;
    }

    if (ios) {
      return (
        <Page>
          <Title isSize={3} tag="h1">Login</Title>
          <Content className="login-entry__root">
            <p>
              Looks like you&apos;re on iOS. We have a native app available on the App Store.
              If you&apos;ve already got the app just continue.
            </p>
            <p>
              Of course you can always use the web app too.
            </p>
            <Button
              tag="button"
              isColor="primary"
              onClick={this.login}
            >
              Continue on web
            </Button>
            <Button
              tag="a"
              isColor="primary"
              href={`${contstant.IOS_PREFIX}token/${token}`}
            >
              Continue in app
            </Button>
          </Content>
        </Page>
      );
    }

    return <Loader />;
  }
}
export default inject('user')(observer(LoginEntry));
