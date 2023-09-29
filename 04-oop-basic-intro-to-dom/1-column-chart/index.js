export default class ColumnChart {
  chartHeight = 50;
  titleObject = document.createElement("div");
  containerObject = document.createElement("div");
  containerBodyObject = document.createElement("div");
  containerHeaderObject = document.createElement("div");
  containerBodyElementObject = document.createElement("div");

  constructor(config = {}) {
    this.config = { ...config };
    this.element = this.createMyElement();
  }

  title() {
    const link = `<a href=${this.config?.link} class="column-chart__link">View all</a>`;
    return this.config?.link
      ? `${this.config?.label}` + link
      : `${this.config?.label}`;
  }

  createBody() {
    this.config?.data?.forEach((element, index) => {
      let cloneElement = this.containerBodyElementObject.cloneNode();
      const maxValue = Math.max(...this.config?.data);
      cloneElement.key = index;
      cloneElement.style = `--value: ${Math.floor(
        (this.chartHeight * element) / maxValue
      )}`;
      cloneElement.dataset.tooltip = `${((element / maxValue) * 100).toFixed(
        0
      )}%`;
      this.containerBodyObject.appendChild(cloneElement);
    });
  }

  createMyElement() {
    let element = document.createElement(`div`);
    element.className = "column-chart";
    if (!this.config?.data || this.config?.data.length === 0) {
      element.classList.add("column-chart_loading");
    }
    
    this.titleObject.className = "column-chart__title";
    this.titleObject.innerHTML = this.title();

    this.containerObject.className = "column-chart__container";

    this.containerHeaderObject.className = "column-chart__header";
    this.containerHeaderObject.dataset.element = "header";
    this.containerHeaderObject.innerHTML = this.config?.formatHeading
      ? this.config?.formatHeading(this.config?.value)
      : this.config?.value;

    this.containerBodyObject.className = "column-chart__chart";
    this.containerBodyObject.dataset.element = "body";

    this.createBody();

    this.containerObject.appendChild(this.containerHeaderObject);
    this.containerObject.appendChild(this.containerBodyObject);

    element.appendChild(this.titleObject);
    element.appendChild(this.containerObject);

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

    while (this.containerBodyObject.firstChild) {
      this.containerBodyObject.removeChild(this.containerBodyObject.firstChild);
    }
    this.createBody();
  }
}
