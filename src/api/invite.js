import { invites, setInvites, setTeam } from './fakedata';

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
      setInvites();
      setTeam();
      resolve();
    }, 500);
  });
};

export const ignoreInvite = (inviteId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      setInvites();
      resolve();
    }, 500);
  });
};
