import React from 'react';
import PropTypes from 'prop-types';
import { Title, Tag } from 'bloomer';
import * as constant from '../../constants';
import './index.scss';

class ScheduleItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  getType = (type) => {
    if (type === constant.NOTIFICATION_TYPE_TECH_TALK) {
      return 'Tech Talk';
    }
    if (type === constant.NOTIFICATION_TYPE_SESSION) {
      return 'Session';
    }
    if (type === constant.NOTIFICATION_TYPE_SPECIAL) {
      return 'Special';
    }
    if (type === constant.NOTIFICATION_TYPE_EVENT) {
      return 'Event';
    }
    return 'Unknown';
  }

  renderTime = (item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const day = days[startDate.getDay()];

    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    const start = startDate.toLocaleTimeString('en-AU', options);
    const end = endDate.toLocaleTimeString('en-AU', options);

    if (start === end) {
      return `${day} ${start}`;
    }
    return `${day} ${start} to ${end}`;
  }

  render() {
    const { item, className } = this.props;
    return (
      <div className={className} key={item.id}>
        <div className="schedule__top-row">
          <div className="schedule__heading">
            <Title isSize={5} tag="h2" className="schedule__name">
              {item.name}
            </Title>
            <Tag isColor="dark" className="schedule__text">{this.getType(item.type)}</Tag>
          </div>
          <p className="schedule__text">{this.renderTime(item)}</p>
        </div>
        <p className="schedule__text">{item.location}</p>
        <p className="schedule__text">{item.description}</p>
      </div>
    );
  }
}

export default ScheduleItem;
