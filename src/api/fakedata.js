export const students = [
  {
    id: 0,
    name: 'Erfan',
    email: 'i@erfan.io'
  },
  {
    id: 1,
    name: 'Someone',
    email: 'someone@email.com'
  },
  {
    id: 2,
    name: 'Someone else',
    email: 'else@email.com'
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'john@youwishyouowned.smith.com'
  }
];

export const team = {
  name: 'something something team',
  students: students.slice(0, 2).map( (student) => ({...student, pending: false }) )
};

export const justJoined = {
  id: 4,
  name: 'Extra',
  email: 'ijustjoined@this.team'
};
