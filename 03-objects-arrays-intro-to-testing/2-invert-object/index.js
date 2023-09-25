/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  const currentObj = new Object();
  if (typeof obj !== "object" && (typeof obj !== "function" || obj === null)) {
    return;
  }
  Object.entries(obj).forEach(([key, value]) => {
    currentObj[value] = key;
  });
  return currentObj;
}
