import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { reaction } from 'mobx';
import { Dropdown, Loader, Message } from 'semantic-ui-react';

class EventSelector extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    eventId: PropTypes.string.isRequired,
    events: MobxPropTypes.observableObject.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { events, onChange } = this.props;
    if (!events.fetched) {
      events.fetchList();

      // setup a one time reaction to set the first event as default
      reaction(
        () => events.list,
        (list, self) => {
          if (list.length > 0) {
            onChange(list[0].id);
          }
          // removes the reaction so this only runs once
          self.dispose();
        },
      );
    } else {
      // set the first event as default
      onChange(events.list[0].id);
    }
  }

  render() {
    const { label, eventId, events, onChange } = this.props;
    const { list, error, fetched } = events;

    if (error) {
      return (
        <Message compact>
          <Message.Header>Something went wrong</Message.Header>
          {error}
        </Message>
      );
    }
    if (!fetched) {
      return <Loader active inline="centered" />;
    }

    return (
      <div>
        {label}
        {' '}
        <Dropdown
          inline
          placeholder="Select an event"
          options={list.map(({ id, name }) => ({ value: id, text: name }))}
          value={eventId}
          onChange={(e, data) => onChange(data.value)}
        />
      </div>
    );
  }
}

export default inject('events')(observer(EventSelector));
