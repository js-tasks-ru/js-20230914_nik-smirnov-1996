import fetchJson from "./utils/fetch-json.js";
import { default as SortableTableParent } from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class SortableTable extends SortableTableParent {
  meta = { start: 0, offset: 30 };
  constructor(
    headersConfig,
    { data = [], sorted = {}, url, isSortLocally = false } = {}
  ) {
    super(headersConfig, data);
    this.url = url;
    this.isSortLocally = isSortLocally;
    this.sorted = sorted;
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    this.subElements.header.addEventListener(
      "pointerdown",
      this.onColumnNameClick
    );
    window.addEventListener("scroll", this.onScrollEnd);
  }

  destroyEventListeners() {
    this.subElements.header.removeEventListener(
      "pointerdown",
      this.onColumnNameClick
    );
    window.removeEventListener("scroll", this.onScrollEnd);
  }

  updateRequestUrl = (sortParams) => {
    const url = new URL(BACKEND_URL + "/" + this.url);
    url.searchParams.append("_sort", sortParams.sorted.id);
    url.searchParams.append("_order", sortParams.sorted.order);
    url.searchParams.append("_start", sortParams.start);
    url.searchParams.append("_end", sortParams.end);
    return url;
  };

  loadData = async (currentUrl) => {
    return await fetchJson(currentUrl);
  };

  render = async() => {
    this.fieldValue = this.sorted.id;
    this.orderValue = this.sorted.order;

    const newURL = this.updateRequestUrl({
      sorted: { id: this.fieldValue, order: this.orderValue },
      start: this.meta.start,
      end: this.meta.start + this.meta.offset,
    });

    this.subElements.loading.style.display = "block";
    this.data = await this.loadData(newURL);
    this.update();
  };

  sortOnServer = async(fieldValue, orderValue) => {
    this.data = [];
    this.meta = { start: 0, offset: 30 };

    this.fieldValue = fieldValue;
    this.orderValue = orderValue;

    const newURL = this.updateRequestUrl({
      sorted: { id: this.fieldValue, order: this.orderValue },
      start: this.meta.start,
      end: this.meta.start + this.meta.offset,
    });

    this.data = await this.loadData(newURL);
    this.update();
  };

  sortOnClient = (fieldValue, orderValue) => {
    super.sort(fieldValue, orderValue);
  };

  onColumnNameClick = (e) => {
    const clickedElement = e.target.closest(".sortable-table__cell");
    const isSortable = clickedElement.getAttribute("data-sortable");
    if (isSortable === "true") {
      this.sort(clickedElement);
    }
  };

  supplementDataOnTable = async() => {
    const newStart = this.meta.start + this.meta.offset;

    const newURL = this.updateRequestUrl({
      sorted: { id: this.fieldValue, order: this.orderValue },
      start: newStart,
      end: newStart + this.meta.offset,
    });

    this.data.push(...await this.loadData(newURL));
    this.meta.start = newStart;
    this.update();
  };

  onScrollEnd = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.supplementDataOnTable();
    }
  };

  update = () => {
    this.subElements.loading.style.display = "none";
    this.subElements.emptyPlaceholder.style.display =
      this.data.length === 0 ? "block" : "none";
    this.subElements.body.innerHTML = super.addTableRows();
    this.subElements.header.innerHTML = super.addHeaderRow();
  };

  sort(clickedElement) {
    const orderValue =
      clickedElement.getAttribute("data-order") &&
      clickedElement.getAttribute("data-order") === "asc"
        ? "desc"
        : "asc";
    if (this.isSortLocally) {
      this.sortOnClient(clickedElement?.getAttribute("data-id"), orderValue);
    } else {
      this.sortOnServer(clickedElement?.getAttribute("data-id"), orderValue);
    }
  }

  remove = () => {
    this.element.remove();
  };

  destroy = () => {
    this.remove();
    this.destroyEventListeners();
  };
}
