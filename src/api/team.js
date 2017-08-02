import { getTeam, team, justJoined, setTeam, unsetTeam } from './fakedata';


export const getStudentsTeam = (userId, eventId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve(getTeam(eventId)), 1000);
  });
};

export const inviteStudentToTeam = (teamId, studentId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      team.students.push({...justJoined, pending: true}); // invite a student to the team in fakedata
      resolve();
    }, 1000);
  });
};

export const createTeam = (eventId, userId, teamName) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      setTeam();
      resolve();
    }, 1000);
  });
};

export const leaveTeam = (userId, teamId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      unsetTeam();
      resolve();
    }, 1000);
  });
};


