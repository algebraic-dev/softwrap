function calcAgeFromDate(date) {
  return new Date().getFullYear() - date.getFullYear();
}

export default { calcAgeFromDate };
