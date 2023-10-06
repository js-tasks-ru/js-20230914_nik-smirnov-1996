import { SortableTable as SortableTableParent } from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableParent {
  #isSortLocally;

  constructor(headersConfig, { data = [], sorted = {} } = {}, isSortLocally = true) {
    super(headersConfig, data);
    this.#isSortLocally = isSortLocally;
    this.sort(sorted?.id, sorted?.oreder);
    console.log("here", super.subElements);
  }

}
