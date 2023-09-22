/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const result = new Object();

  Object.entries(obj)
    .filter((element) => fields.find((key) => key === element[0]))
    .map((element) => (result[element[0]] = element[1]));

  return result;
};
