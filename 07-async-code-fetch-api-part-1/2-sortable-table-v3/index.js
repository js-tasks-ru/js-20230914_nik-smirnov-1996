import fetchJson from "./utils/fetch-json.js";
// import { default as SortableTableParent } from "../../06-events-practice/1-sortable-table-v2/index.js";

const BACKEND_URL = "https://course-js.javascript.ru";

// export default class SortableTable extends SortableTableParent {
//   constructor(headersConfig, { data = [], sorted = {}, url } = {}) {
//     super(headersConfig, { data, sorted });
//     this.url = url;
//     this.isSortLocally = !this.url;
//     console.log("url:", this.isSortLocally);
//   }

//   sortOnClient(id, order) {}

//   sortOnServer(id, order) {}
// }
// https://course-js.javascript.ru/api/rest/products?_embed=subcategory.category&_sort=title&_order=asc&_start=30&_end=60

import { default as SortableTableParent } from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableParent {
  isSortLocally;
  meta = { start: 0, offset: 30 };
  constructor(headersConfig, { data = [], sorted = {}, url } = {}) {
    super(headersConfig, data);
    this.url = url;
    this.isSortLocally = !url;
    this.sorted = sorted;
    console.log("sorted:", this.sorted);
    this.sort();
    this.editHeader();
  }
  // here

  // sort(fieldValue, orderValue) {
  //   this.fieldValue = fieldValue;
  //   this.orderValue = orderValue;
  //   this.data = this.sortData();
  //   this.subElements.body.innerHTML = this.addTableRows();
  //   this.subElements.header.innerHTML = this.addHeaderRow();
  // }
  updateRequestUrl = (sortParams) => {
    const url = new URL(BACKEND_URL + "/" + this.url);
    console.log("this.sorted :", sortParams.sorted);
    url.searchParams.append("_sort", sortParams.sorted.id);
    url.searchParams.append("_order", sortParams.sorted.order);
    url.searchParams.append("_start", sortParams.start);
    url.searchParams.append("_end", sortParams.end);
    this.meta.start = sortParams.end;
    return url;
  };

  getCurrentData = (newURL) => {
    const currentData = fetchJson(newURL).then((data) => {
      return data;
    });
    console.log("stata", currentData);
    return currentData;
  };

  // createPromise = 

  sortOnServer = async (clickedElement) => {
    if (!clickedElement) {
      const newURL = this.updateRequestUrl({
        sorted: this.sorted,
        start: this.meta.start,
        end: this.meta.start + this.meta.offset,
      });

      let createPromise = new Promise(function (resolve, reject) {
        const currentData = fetchJson(newURL).then((data) => {
          return data;
        });
        resolve(currentData);
      });
      createPromise.then((result) => console.log(result));
      // let promise = new Promise((result, error)=> this.getCurrentData(rejected));
      // promise.then(
      //   result => alert("SUCCESS"),
      //   error => alert("OH NO")
      // );
      // const currentData = this.getCurrentData(newURL);
      // console.log("currentData!:", currentData);
      // return super.sort(this.sorted?.id, this.sorted?.order);
    }

    // console.log();
    return;
  };


  sortOnClient = (clickedElement) => {
    if (!clickedElement) {
      console.log("defaultLocalSort");
      return super.sort(this.sorted?.id, this.sorted?.order);
    }
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
      this.sortOnServer(clickedElement);
    }
  }

  editHeader() {
    this.subElements.header.addEventListener(
      "pointerdown",
      this.onColumnNameClick
    );
  }
}
