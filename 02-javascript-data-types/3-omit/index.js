/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  let result = new Object();

  Object.entries(obj)
    .filter((element) => !fields.find((key) => key === element[0]))
    .map((element) => (result[element[0]] = element[1]));

  return result;
};
