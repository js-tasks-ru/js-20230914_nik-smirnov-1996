/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathKeys = path.split(".");

  return (obj) => {
    console.log("___________________________________", pathKeys);
    let currentObj = obj;
    pathKeys.map((pathKey) => {
      console.log("currentObj1:", currentObj);
      if (pathKey in currentObj) {
        console.log("here:", pathKey);
        currentObj = obj[pathKey];
      }
      console.log("currentObj2:", currentObj);
    });
    console.log("currentObj:", currentObj);
    return currentObj;
  };
}
