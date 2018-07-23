import React from 'react';
import { observer, inject, PropTypes as MobxPropTypes } from 'mobx-react';
import { Container, Title, Button } from 'bloomer';
import Loader from '../Loader';
import './index.scss';

const Event = ({ events }) => {
  const { selected } = events;

  if (!selected) {
    return <Loader />;
  }

  return (
    <Container>
      <div className="event-info__section">
        <Title isSize={3} tag="h1">{selected.name}</Title>
        <p>{selected.location}</p>
      </div>

      <div className="event-info__section">
        <Title isSize={5} tag="h2">Sponsors</Title>
        <p>{selected.sponsors.summary}</p>
        <Button
          className="event-info__button"
          isSize="small"
          render={props => <a target="_blank" href={selected.sponsors.url} {...props}>Open Details</a>}
        />
      </div>

      <div className="event-info__section">
        <Title isSize={5} tag="h2">Prizes</Title>
        <p>{selected.prizes.summary}</p>
        <Button
          className="event-info__button"
          isSize="small"
          render={props => <a target="_blank" href={selected.prizes.url} {...props}>Open Details</a>}
        />
      </div>

      <div className="event-info__section">
        <Title isSize={5} tag="h2">Judges</Title>
        <p>{selected.judges.summary}</p>
        <Button
          className="event-info__button"
          isSize="small"
          render={props => <a target="_blank" href={selected.judges.url} {...props}>Open Details</a>}
        />
      </div>

      <div className="event-info__section">
        <Title isSize={5} tag="h2">Handbook</Title>
        <Button
          className="event-info__button"
          isSize="small"
          render={props => <a target="_blank" href={selected.handbookUrl} {...props}>Open Handbook</a>}
        />
      </div>
    </Container>
  );
};
Event.propTypes = {
  events: MobxPropTypes.observableObject.isRequired,
};

export default inject('events')(observer(Event));
