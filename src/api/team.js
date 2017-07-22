export const getUserTeam = (userId) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve({
      name: 'something something team',
      members: [
        {
          name: 'Erfan',
          email: 'i@erfan.io'
        },
        {
          name: 'Somone',
          email: 'email@me.me'
        }
      ]
    }), 1000);
  });
};
