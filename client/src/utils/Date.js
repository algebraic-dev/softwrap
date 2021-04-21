function calcAgeFromDate(date) {
  const utcDiff = Date.now() - date.getTime();
  const yearDiff = new Date(utcDiff).getFullYear();
  // I subtracted 1970 because the initial date that is defined
  // by the UTC data format is 1970 so, when we use getFullYear
  // with the lowest value possible (0) it will return 1970.
  return yearDiff - 1970;
}

export default { calcAgeFromDate };
