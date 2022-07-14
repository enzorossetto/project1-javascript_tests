module.exports.queryString = (obj) => {
  const entries = Object.entries(obj).map((item) => `${item[0]}=${item[1]}`);

  return entries.join('&');
};
