export default class ColumnChart {
  chartHeight = 50;

  constructor(config = {}) {
    this.config = { ...config };
    this.element = this.createElement();
  }

  title() {
    const link = `<a href=${this.config?.link} class="column-chart__link">View all</a>`;
    return this.config?.link
      ? `${this.config?.label}` + link
      : `${this.config?.label}`;
  }

  createElement() {
    let element = document.createElement(`div`);
    element.className = "column-chart";
    if (!this.config?.data || this.config?.data.length === 0) {
      element.classList.add("column-chart_loading");
    }

    let title = document.createElement("div");
    title.className = "column-chart__title";
    title.innerHTML = this.title();

    let container = document.createElement("div");
    container.className = "column-chart__container";

    let containerHeader = document.createElement("div");
    containerHeader.className = "column-chart__header";
    containerHeader.dataset.element = "header";
    containerHeader.innerHTML = this.config?.formatHeading
      ? this.config?.formatHeading(this.config?.value)
      : this.config?.value;

    let containerBody = document.createElement("div");
    containerBody.className = "column-chart__chart";
    containerBody.dataset.element = "body";

    let containerBodyElement = document.createElement("div");

    this.config?.data?.forEach((element, index) => {
      let cloneElement = containerBodyElement.cloneNode();
      const maxValue = Math.max(...this.config?.data);
      cloneElement.key = index;
      cloneElement.style = `--value: ${Math.floor(
        (this.chartHeight * element) / maxValue
      )}`;
      cloneElement.dataset.tooltip = `${((element / maxValue) * 100).toFixed(
        0
      )}%`;
      containerBody.appendChild(cloneElement);
    });

    container.appendChild(containerHeader);
    container.appendChild(containerBody);

    element.appendChild(title);
    element.appendChild(container);

    return element;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  update(value) {
    this.config.data = value;
  }
}
