import { students } from './fakedata';

export const getAllStudents = () => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve(students), 1000);
  });
};
