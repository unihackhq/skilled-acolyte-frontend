export default (title) => {
  if (document) {
    document.title = `UNIHACK - ${title}`;
  }
};
