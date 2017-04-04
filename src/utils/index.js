export const setTitle = (title) => {
  if (typeof document != undefined) {
    document.title = `Unihack - ${title}`;
  }
}
