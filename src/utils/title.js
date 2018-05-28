export default (title) => {
  if (document) {
    document.title = `Unihack - ${title}`;
  }
};
