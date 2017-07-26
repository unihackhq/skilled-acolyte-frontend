import { students } from './fakedata';

let cache = {
  students: null
};
export const getAllStudents = () => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    if (cache.students !== null) {
      resolve(cache.students);
    }
    cache.students = students;
    setTimeout(() => resolve(students), 1000);
  });
};
