export default class SortableTable {
  #fieldValue = undefined;
  #orderValue = undefined;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createTableElement();
  }

  remove() {
    this.#fieldValue = undefined;
    this.#orderValue = undefined;
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
                : `<div class = "sortable-table__cell">${dataElement[rowElement.id]}</div>`;
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
        <div class="sortable-table__cell" data-id=${headerElement.id} data-sortable=${headerElement.sortable ?? "false"} ${this.#orderValue ? `data-order=${this.#orderValue}` : ""}
          <span>${headerElement.title}</span>
          ${this.#fieldValue === headerElement.id ? `
          <span data-element="arrow" class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>` : ""}
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
    let element = document.createElement("div");
    element.className = `sortable-table`;
    element.innerHTML =
      this.addTableHeader() + this.addTableBody() + this.addLoadingTable();
    this.subElements = {
      body: element.querySelector('[data-element="body"]'),
      header: element.querySelectorAll('[data-element="header"]'),
      loading: element.querySelectorAll('[data-element="loading"]'),
      emptyPlaceholder: element.querySelectorAll('[data-element="emptyPlaceholder"]')
    };
    
    return element;
  }

  sortAsc = (a, b) => {
    return typeof b[this.#fieldValue] === 'string' && typeof a[this.#fieldValue] === 'string' ? 
      a[this.#fieldValue].localeCompare(b[this.#fieldValue], ["ru", "en"], { caseFirst: "upper" }) : 
      a[this.#fieldValue] - b[this.#fieldValue];
  };

  sortDesc = (a, b) => {
    return typeof b[this.#fieldValue] === 'string' && typeof a[this.#fieldValue] === 'string' ? 
      b[this.#fieldValue].localeCompare(a[this.#fieldValue], ["ru", "en"], { caseFirst: "upper" }) : 
      b[this.#fieldValue] - a[this.#fieldValue];
  };
  
  sortData() {
    return [...this.data].sort(this.#orderValue === "asc" ? this.sortAsc : this.sortDesc);
  }

  sort(fieldValue, orderValue) {
    this.#fieldValue = fieldValue;
    this.#orderValue = orderValue;
    this.data = this.sortData();
    this.subElements.body.innerHTML = this.addTableRows();
    this.subElements.header.innerHTML = this.addHeaderRow();
  }
}