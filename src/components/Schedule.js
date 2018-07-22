import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { reaction } from 'mobx';
import { Container, Title } from 'bloomer';
import Loader from './Loader';
import ScheduleItem from './ScheduleItem';

class Schedule extends React.Component {
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

  render() {
    const { events } = this.props;
    if (!events.schedule) {
      return <Loader />;
    }

    return (
      <Container>
        <Title isSize={3} tag="h1">Schedule</Title>
        {events.schedule.map(item => <ScheduleItem key={item.id} item={item} />)}
      </Container>
    );
  }
}

export default inject('events')(observer(Schedule));