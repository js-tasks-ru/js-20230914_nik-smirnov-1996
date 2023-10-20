import fetchJson from "./utils/fetch-json.js";
import { default as ColumnChartParent } from "../../04-oop-basic-intro-to-dom/1-column-chart/index.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart extends ColumnChartParent {
  subElements;
  constructor(config) {
    super(config);
    this.selectSubElements();
  }

  sum = (array) => {
    return array.reduce((a, b) => a + b, 0);
  };

  selectSubElements = () => {
    this.subElements = {
      body: this.element.querySelector(`[data-element="body"]`),
      header: this.element.querySelector(`[data-element="header"]`),
      mainElement: this.mainElement,
    };
  };

  clearColumnChartBody = () => {
    while (this.subElements.body.firstChild) {
      this.subElements.body.removeChild(this.subElements.body.firstChild);
    }
  };

  updateColumnChartHeader = () => {
    if (this.config.data && this.config.data.length > 0) {
      this.subElements.mainElement.classList.remove("column-chart_loading");
    } else {
      this.subElements.mainElement.classList.add("column-chart_loading");
    }
    this.subElements.header.innerHTML = this.config?.formatHeading
      ? this.config?.formatHeading(this.config?.value)
      : this.config?.value;
  };

  updateColumnChart = () => {
    this.clearColumnChartBody();
    this.updateColumnChartHeader();
    super.createElementBody();
  };

  updateRequestUrl =(start, end)=> {
    const url = new URL(BACKEND_URL + "/" + this.config.url);
    url.searchParams.append("from", start);
    url.searchParams.append("to", end);
    return url;
  }

  update = async (start, end) => {
    const currentData = await fetchJson(this.updateRequestUrl(start, end)).then((data) => {
      return data;
    });
    this.config.data = Object.values(currentData);
    this.config.value = this.sum(this.config.data);

    this.updateColumnChart();
    return currentData;
  };
}