export const getInfo = (token) => {
  // TODO: do actual server calls
  return new Promise(resolve => {
    setTimeout(() => resolve({
      email: 'i@erfan.io',
      fname: 'Erfan',
      lname: 'Norozi',
    }), 1000);
  });
};

export const register = (data) => {
  // TODO: do actual server calls
  return new Promise(resolve => setTimeout(resolve, 2000));
};

