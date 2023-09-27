export default class ColumnChart {
  constructor(config = {}) {
    this.config = { ...config };
  }

  title(config) {
    const link = `<a href=${config?.link} class="column-chart__link">View all</a>`;

    return config?.link ? `${config?.label}` + link : `${config?.label}`; 
  }

  createElement(config) {

    const maxValue = Math.max(...config?.data);

    let element = document.createElement(`div`);
    element.className = "column-chart";
    element.style = "--chart-height: 50";

    let title = document.createElement("div");
    title.className = "column-chart__title";
    title.innerHTML = this.title(config);

    let container = document.createElement("div");
    container.className = "column-chart__container";

    let containerHeader = document.createElement("div");
    containerHeader.className = "column-chart__header";
    containerHeader.dataset.element = "header";
    containerHeader.innerHTML = config?.value;

    let containerBody = document.createElement("div");
    containerBody.className = "column-chart__chart";
    containerBody.dataset.element = "body";

    let containerBodyElement = document.createElement("div");
    
    config?.data.forEach((element, index) => {
        let cloneElement = containerBodyElement.cloneNode();
        cloneElement.key = index;
        cloneElement.style = `--value: ${(50 * element) / maxValue}`;
        cloneElement.dataset.tooltip = `${Math.round((element / maxValue) * 100)}%`;
        containerBody.appendChild(cloneElement);
    })

    container.appendChild(containerHeader);
    container.appendChild(containerBody);

    element.appendChild(title);
    element.appendChild(container);

    return element;
  }

  get element() {
    return this.createElement(this.config);
  }
}
