export default (title) => {
  if (document) {
    document.title = `UNIHACK - Participant Console - ${title}`;
  }
};
