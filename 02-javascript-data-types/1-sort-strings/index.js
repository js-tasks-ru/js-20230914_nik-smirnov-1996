/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

const sortAsc = (a, b) => {
  return a.localeCompare(b, ["ru", "en"], { caseFirst: "upper" });
};

const sortDesc = (a, b) => {
  return b.localeCompare(a, ["ru", "en"], { caseFirst: "upper" });
};

export function sortStrings(arr, param = "asc") {
  return [...arr].sort(param === "asc" ? sortAsc : sortDesc);
}
