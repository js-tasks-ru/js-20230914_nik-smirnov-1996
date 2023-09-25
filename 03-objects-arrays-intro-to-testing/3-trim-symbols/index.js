/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size = string.length) {
  let currentStr = "";
  let counter = 1;
  for (let index = 0; index < string.length; index++) {
    if (string[index] !== string[index - 1] && counter <= size) {
      currentStr = currentStr + string[index];
      counter = 1;
    }
    if (string[index] === string[index - 1] && counter < size) {
      currentStr = currentStr + string[index];
      counter++;
    }
  }
  return currentStr;
}
