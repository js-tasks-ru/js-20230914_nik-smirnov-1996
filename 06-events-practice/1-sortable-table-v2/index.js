// import SortableTableParent from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

class SortableTableParent {
  fieldValue;
  orderValue;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createTableElement();
  }

  remove() {
    this.fieldValue = undefined;
    this.orderValue = undefined;
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  addTableRows() {
    return this.data
      .map((dataElement) => {
        return (
          `
        <a href="/products/${dataElement.id}" class="sortable-table__row">` +
          this.headerConfig
            .map((rowElement) => {
              return rowElement.template
                ? rowElement.template(dataElement[rowElement.id])
                : `<div class = "sortable-table__cell">${
                    dataElement[rowElement.id]
                  }</div>`;
            })
            .join("") +
          `</a>`
        );
      })
      .join("");
  }

  addHeaderRow() {
    return this.headerConfig
      .map((headerElement) => {
        return `
        <div class="sortable-table__cell" data-id=${
          headerElement.id
        } data-sortable=${headerElement.sortable ?? "false"} ${
          this.orderValue && headerElement.id === this.fieldValue
            ? `data-order=${this.orderValue}`
            : ""
        }
          <span>${headerElement.title}</span>
          ${
            this.fieldValue === headerElement.id
              ? `
          <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>`
              : ""
          }
      </div>`;
      })
      .join("");
  }

  addTableHeader() {
    return (
      `
      <div data-element="header" class="sortable-table__header sortable-table__row">` +
      this.addHeaderRow() +
      `</div>`
    );
  }

  addTableBody() {
    return (
      `
      <div data-element="body" class="sortable-table__body">` +
      this.addTableRows() +
      `</div>`
    );
  }

  addLoadingTable() {
    return `
    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
    <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
      <div>
        <p>No products satisfies your filter criteria</p>
        <button type="button" class="button-primary-outline">Reset all filters</button>
      </div>
    </div>
    `;
  }

  createTableElement() {
    const element = document.createElement("div");
    element.className = `sortable-table`;
    element.innerHTML =
      this.addTableHeader() + this.addTableBody() + this.addLoadingTable();
    this.subElements = {
      body: element.querySelector('[data-element="body"]'),
      header: element.querySelector('[data-element="header"]'),
      loading: element.querySelector('[data-element="loading"]'),
      emptyPlaceholder: element.querySelector(
        '[data-element="emptyPlaceholder"]'
      ),
    };

    return element;
  }

  sortString(a, b) {
    return a.localeCompare(b, ["ru", "en"], { caseFirst: "upper" });
  }

  sortNum(a, b) {
    return a - b;
  }

  sortAsc = (a, b) => {
    return typeof b[this.fieldValue] === "string" &&
      typeof a[this.fieldValue] === "string"
      ? this.sortString(a[this.fieldValue], b[this.fieldValue])
      : this.sortNum(a[this.fieldValue], b[this.fieldValue]);
  };

  sortDesc = (a, b) => {
    return typeof b[this.fieldValue] === "string" &&
      typeof a[this.fieldValue] === "string"
      ? this.sortString(b[this.fieldValue], a[this.fieldValue])
      : this.sortNum(b[this.fieldValue], a[this.fieldValue]);
  };

  sortData() {
    return [...this.data].sort(
      this.orderValue === "asc" ? this.sortAsc : this.sortDesc
    );
  }

  sort(fieldValue, orderValue) {
    this.fieldValue = fieldValue;
    this.orderValue = orderValue;
    // console.log("fieldValue:", this.fieldValue, this.orderValue );
    this.data = this.sortData();
    this.subElements.body.innerHTML = this.addTableRows();
    this.subElements.header.innerHTML = this.addHeaderRow();
  }
}

export default class SortableTable extends SortableTableParent {
  #isSortLocally;

  constructor(
    headersConfig,
    { data = [], sorted = {} } = {},
    isSortLocally = true
  ) {
    super(headersConfig, data);
    this.#isSortLocally = isSortLocally;
    this.sort(sorted?.id, sorted?.order);
    this.editHeader();
  }

  // sortTest = (a, b) => {
  //   return super.sort(a, b);
  // }

  onColumnNameClick = (e) => {
    console.log("this:", this);
    const clickedElement = e.target.closest(".sortable-table__cell");
    const orderValue =
      clickedElement.getAttribute("data-order") &&
      clickedElement.getAttribute("data-order") === "asc"
        ? "desc"
        : "asc";
    // this.sortTest(clickedElement.getAttribute("data-id"), orderValue);
    super.sort(clickedElement.getAttribute("data-id"), orderValue);
  }

  editHeader() {
    console.log("this", this);
    this.subElements.header.addEventListener("click", this.onColumnNameClick);
  }
}
