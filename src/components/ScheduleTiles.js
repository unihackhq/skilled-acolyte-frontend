import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { reaction } from 'mobx';
import { Notification, Title } from 'bloomer';
import groupBy from 'lodash.groupby';
import * as constant from '../constants';
import Loader from './Loader';

class ScheduleTiles extends React.Component {
  static propTypes = {
    events: MobxPropTypes.observableObject.isRequired,
  }

  componentDidMount() {
    const { events } = this.props;
    reaction(
      () => events.selectedId,
      (id, self) => {
        this.reaction = self;

        if (id) {
          events.fetchSchedule();
        }
      },
      { fireImmediately: true },
    );
  }

  componentWillUnmount() {
    this.reaction.dispose();
  }

  firstAfterNow = (list) => {
    const now = new Date();
    let min = null;

    list.forEach((item) => {
      const start = new Date(item.startDate);

      // check start after now and
      // if min hasn't been set yet or
      // if this item starts before current min
      if (now < start && (!min || start < new Date(min.startDate))) {
        min = item;
      }
    });

    return min;
  }

  render() {
    const { events } = this.props;
    if (!events.schedule) {
      return <Loader />;
    }

    const groupedSchedule = groupBy(events.schedule, 'type');
    const techTalks = groupedSchedule[constant.NOTIFICATION_TYPE_TECH_TALK];

    const nextTechTalk = this.firstAfterNow(techTalks);
    const nextSchedule = this.firstAfterNow(events.schedule);

    return (
      <React.Fragment>
        {nextSchedule ? (
          <Notification>
            <Title isSize={5} tag="h2">Next Up</Title>
            <p><b>{nextSchedule.name}</b></p>
            <p>{nextSchedule.description}</p>
            <p>{nextSchedule.location}</p>
          </Notification>
        ) : null}
        {nextTechTalk ? (
          <Notification>
            <Title isSize={5} tag="h2">Next Tech Talk</Title>
            <p><b>{nextTechTalk.name}</b></p>
            <p>{nextTechTalk.description}</p>
            <p>{nextTechTalk.location}</p>
          </Notification>
        ) : null}
      </React.Fragment>
    );
  }
}

export default inject('events')(observer(ScheduleTiles));
