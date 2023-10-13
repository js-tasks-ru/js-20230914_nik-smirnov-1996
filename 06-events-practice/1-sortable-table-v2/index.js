import SortableTableParent from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableParent {
  isSortLocally;
  constructor(headersConfig, { data = [], sorted = {} } = {}, isSortLocally = true) {
    super(headersConfig, data);
    super.sort(sorted?.id, sorted?.order);
    this.isSortLocally = isSortLocally;
    this.editHeader();
  }

  sortOnServer = () => {
    return;
  };

  sortOnClient = (clickedElement) => {
    const orderValue =
      clickedElement.getAttribute("data-order") &&
      clickedElement.getAttribute("data-order") === "asc"
        ? "desc"
        : "asc";
    super.sort(clickedElement.getAttribute("data-id"), orderValue);
  };

  onColumnNameClick = (e) => {
    const clickedElement = e.target.closest(".sortable-table__cell");
    const isSortable = clickedElement.getAttribute("data-sortable");
    if (isSortable === "true") {
      this.sort(clickedElement);
    }
  };

  sort(clickedElement) {
    if (this.isSortLocally) {
      this.sortOnClient(clickedElement);
    } else {
      this.sortOnServer();
    }
  }

  editHeader() {
    this.subElements.header.addEventListener(
      "pointerdown",
      this.onColumnNameClick
    );
  }
}
