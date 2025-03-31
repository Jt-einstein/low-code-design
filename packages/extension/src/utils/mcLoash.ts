
const pick = (obj, keys) => {
  const result = {};
  keys.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  });
  return result;
}
function omit(obj, keys) {
  const result = {};
  for (const key in obj) {
    if (keys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  }
  return result;
}
export { pick, omit }