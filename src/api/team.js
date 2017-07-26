import { team, justJoined } from './fakedata';

export const getStudentsTeam = (studentId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    // setTimeout(() => resolve(null), 1000);
    setTimeout(() => resolve(team), 1000);
  });
};

export const inviteStudentToTeam = (studentId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => {
      team.students.push({...justJoined, pending: true}); // invite a student to the team in fakedata
      resolve();
    }, 1000);
  });
};
