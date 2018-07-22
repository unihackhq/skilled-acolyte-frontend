import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'bloomer';
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
        <div className="page first-launch">
          <h2 className="first-launch__title">Confirm Your Details</h2>
          <div className="first-launch__blurb">
            <p>Welcome to the UNIHACK web app!</p>
            <p>
              We&apos;ve imported your details from Eventbrite. Please make sure everything is
              correct.
            </p>
          </div>
          <InternalEditProfile />
        </div>
      </Container>
    );
  }
}

export default inject('user')(observer(FirstLaunch));
