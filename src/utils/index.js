export const setTitle = (title) => {
  if (document) {
    document.title = `Unihack - ${title}`;
  }
};
