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

export const justJoined = {
  id: 4,
  name: 'Extra',
  email: 'ijustjoined@this.team'
};

export const events = [
  {
    id: '11',
    name: 'Unihack Melbourne'
  },
  {
    id: '00',
    name: 'Unihack Sydney'
  }
];

const invitesData = [
  {
    id: 0,
    teamName: 'Some Team'
  },
  {
    id: 1,
    teamName: 'Some Other Team'
  }
];
export let invites = invitesData;
export const unsetInvites = () => {
  invites = [];
};

let teamSet = true;
export const team = {
  name: 'something something team',
  students: students.slice(0, 2).map( (student) => ({...student, pending: false }) )
};
export const getTeam = (eventId) => (teamSet && {...team, eventId}) || null;
export const setTeam = () => {
  teamSet = true;
};
export const unsetTeam = () => {
  teamSet = false;
};
