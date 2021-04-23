const formatTwoDigits = (n) => (n).toLocaleString('en-US', { minimumIntegerDigits: 2 });

export const calcAgeFromDate = (date) => {
  const diff = Date.now() - date.getTime();
  return Math.max(new Date(diff).getUTCFullYear() - 1970, 0);
};

export const formatDate = (date = new Date()) => {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${year}-${formatTwoDigits(month)}-${formatTwoDigits(day)}`;
};
