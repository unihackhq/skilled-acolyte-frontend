import { events } from './fakedata';

export const getAllEvents = () => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve(events), 1000);
  });
};
