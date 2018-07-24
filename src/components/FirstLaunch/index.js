import React from 'react';
import PropTypes from 'prop-types';
import { Container, Title } from 'bloomer';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import { reaction } from 'mobx';
import InternalEditProfile from '../Profile/InternalEditProfile';
import './index.scss';

class FirstLaunch extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    user: MobxPropTypes.observableObject.isRequired,
  };

  componentDidMount() {
    const { user, history } = this.props;

    reaction(
      () => user.details.firstLaunch,
      (firstLaunch, self) => {
        this.reaction = self;
        if (!firstLaunch) {
          history.push('/');

          self.dispose();
        }
      },
      { fireImmediately: true },
    );
  }

  componentWillUnmount() {
    this.reaction.dispose();
  }

  render() {
    return (
      <Container>
        <Title isSize={3} tag="h1">Confirm Your Details</Title>
        <div className="first-launch__blurb">
          <p>Welcome to the UNIHACK web app!</p>
          <p>
            We&apos;ve imported your details from eventbrite.
            {' '}
            Please make sure everything is correct.
          </p>
        </div>
        <InternalEditProfile />
      </Container>
    );
  }
}

export default inject('user')(observer(FirstLaunch));
