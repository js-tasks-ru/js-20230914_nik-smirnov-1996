export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createTableElement();
  }

  addTableHeader() {
    return (
      `
      <div data-element="header" class="sortable-table__header sortable-table__row">` +
      this.headerConfig
        .map((headerElement) => {
          return `<div class="sortable-table__cell" 
        data-id=${headerElement.id} 
        data-sortable=${headerElement.sortable ?? "false"} 
        data-order=${headerElement.sortDirection ?? "asc"}>
          <span>${headerElement.title}</span>
        </div>`;
        })
        .join("") +
      `</div>`
    );
  }

  addTableBody() {
    return (`
      <div data-element="body" class="sortable-table__body">` +
        this.data.map((dataElement) => {
          return `
            <a href="/products/${dataElement.id}" class="sortable-table__row">` +
            this.headerConfig.map((rowElement) => {
              console.log("rowElement:", rowElement);
              return rowElement.template ? rowElement.template() : `<div class = "sortable-table__cell">${dataElement[rowElement.id]}</div>`;
            }).join("") +
            `</a>`;
        }).join('') +
      `</div>
      <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
      `);
  }

  createTableElement() {
    let element = document.createElement("div");
    element.className = `sortable-table`;
    element.innerHTML = this.addTableHeader() + this.addTableBody();
    return element;
  }

  sort(fieldValue, orderValue) {
    document.body.append(this.element);
    console.log("fieldValue:", fieldValue);
    console.log("orderValue:", orderValue);
  }
}
