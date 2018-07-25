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

    const options = { hour: 'numeric', minute: 'numeric' };
    const start = startDate.toLocaleTimeString('en-AU', options);
    const end = endDate.toLocaleTimeString('en-AU', options);

    return `${start} to ${end}`;
  }

  render() {
    const { item, className } = this.props;
    return (
      <div className={className} key={item.id}>
        <div className="schedule__title">
          <Title
            isSize={5}
            tag="h2"
            className="schedule__title__heading"
          >
            {item.name}
          </Title>
          <div className="schedule__title__tag">
            <Tag isColor="dark">{this.getType(item.type)}</Tag>
          </div>
          <p>{this.renderTime(item)}</p>
        </div>
        <p>{item.description}</p>
        <p>{item.location}</p>
      </div>
    );
  }
}

export default ScheduleItem;
