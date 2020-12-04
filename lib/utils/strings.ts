export const getTitleString = (
  title: string | string[] | undefined,
): string => {
  let titleString = 'Kara';
  if (title) {
    titleString += ' | ';
    if (Array.isArray(title)) {
      titleString += title.join(' | ');
    } else {
      titleString += title;
    }
  }
  return titleString;
};
