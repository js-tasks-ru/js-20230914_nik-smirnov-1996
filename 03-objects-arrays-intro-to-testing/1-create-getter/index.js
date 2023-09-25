/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathKeys = path.split(".");
  return (obj) => {
    let currentObj = obj;
    for (let keyIndex in pathKeys) {
      currentObj =
        currentObj && pathKeys[keyIndex] in currentObj
          ? currentObj[pathKeys[keyIndex]]
          : undefined;
      if (currentObj === undefined) {
        return;
      }
    }
    return currentObj;
  };
}
