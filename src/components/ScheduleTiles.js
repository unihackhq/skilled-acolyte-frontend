import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { reaction } from 'mobx';
import { Title } from 'bloomer';
import groupBy from 'lodash.groupby';
import * as constant from '../constants';
import Loader from './Loader';
import ScheduleItem from './ScheduleItem';

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

    // eslint-disable-next-line no-restricted-syntax
    for (const item of list) {
      const start = new Date(item.startDate);

      // check start after now
      if (now < start) {
        return item;
      }
    }

    return null;
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
          <React.Fragment>
            <Title isSize={4} tag="h2">Next Up</Title>
            <ScheduleItem item={nextSchedule} />
          </React.Fragment>
        ) : null}
        {nextTechTalk ? (
          <React.Fragment>
            <Title isSize={4} tag="h2">Next Tech Talk</Title>
            <ScheduleItem item={nextTechTalk} />
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

export default inject('events')(observer(ScheduleTiles));
