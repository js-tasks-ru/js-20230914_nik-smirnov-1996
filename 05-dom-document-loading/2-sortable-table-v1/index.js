export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createTableElement();
  }

  /* <div data-element="header" class="sortable-table__header sortable-table__row">
      <div class="sortable-table__cell" data-id="images" data-sortable="false" data-order="asc">
        <span>Image</span>
      </div>
      <div class="sortable-table__cell" data-id="title" data-sortable="true" data-order="asc">
        <span>Name</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
      <div class="sortable-table__cell" data-id="quantity" data-sortable="true" data-order="asc">
        <span>Quantity</span>
      </div>
      <div class="sortable-table__cell" data-id="price" data-sortable="true" data-order="asc">
        <span>Price</span>
      </div>
      <div class="sortable-table__cell" data-id="sales" data-sortable="true" data-order="asc">
        <span>Sales</span>
      </div>sortable
    </div> */

  addTableHeader() {
    return `
      <div data-element="header" class="sortable-table__header sortable-table__row">
        ${this.headerConfig.forEach((headerElement) => {
          `<div class="sortable-table__cell" 
          data-id=${headerElement.id} 
          data-sortable=${headerElement.sortable ?? "false"} 
          data-order=${headerElement.sortDirection ?? 'asc'}>
            <span>${headerElement.title}</span>
          </div>`
        })}
      <div>
    `;
  }

  createTableElement() {
    let element = document.createElement("div");
    element.className = `sortable-table`;
    element.innerHTML = `${this.addTableHeader()}`;
    return element;
  }

  sort(fieldValue, orderValue) {
    document.body.append(this.element);
    console.log("fieldValue:", fieldValue);
    console.log("orderValue:", orderValue);
  }
}
