/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
// не понял, как корректно отсортировать слова, в которых есть юбольшые буквы, при этом не сравнивая все буквы друг с другом
  return arr?.sort((a, b) =>
    param === "asc" ? a.localeCompare(b) : b.localeCompare(a)
  );
}
