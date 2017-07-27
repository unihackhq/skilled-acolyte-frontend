import { invites } from './fakedata';

export const getInvites = (userId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(invites);
    }, 2000);
  });
};

