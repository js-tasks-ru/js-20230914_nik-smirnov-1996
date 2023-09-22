/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathKeys = path.split(".");

  return (obj) => {
    console.log("___________________________________");
    let currentObj = obj;
    pathKeys.map((pathKey) => {
      if (pathKey in obj) {
        console.log("here:", pathKey);
        currentObj = obj[pathKey];
      }
    });
    console.log("currentObj:", currentObj);
    return currentObj;
  };
}
