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
export const setInvites = () => {
  invites = [];
};

const teamData = {
  name: 'something something team',
  students: students.slice(0, 2).map( (student) => ({...student, pending: false }) )
};
export let team = null;
export const setTeam = () => {
  team = teamData;
};
