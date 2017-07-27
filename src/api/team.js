import { team as aTeam, justJoined } from './fakedata';

let team = null;
// let team = aTeam;

export const getStudentsTeam = (userId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve(team), 1000);
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

export const createTeam = (userId, teamName) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      team = aTeam;
      resolve();
    }, 1000);
  });
};

