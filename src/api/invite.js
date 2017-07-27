import { invites, unsetInvites, setTeam } from './fakedata';

export const getInvites = (userId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve(invites), 2000);
  });
};

export const acceptInvite = (inviteId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      unsetInvites();
      setTeam();
      resolve();
    }, 500);
  });
};

export const ignoreInvite = (inviteId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      unsetInvites();
      resolve();
    }, 500);
  });
};
