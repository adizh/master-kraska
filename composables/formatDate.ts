export const formatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  });

  return formattedDate;
};

export const formatName = (name: string) => {
  const value = name.split(' ');
  return value?.length > 5
    ? value.slice(0, 5).join(' ') + '...'
    : value.join(' ');
};
