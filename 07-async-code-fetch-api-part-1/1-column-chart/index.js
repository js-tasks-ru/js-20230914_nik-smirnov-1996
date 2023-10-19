import fetchJson from "./utils/fetch-json.js";
import { default as ColumnChartParent } from "../../04-oop-basic-intro-to-dom/1-column-chart/index.js";

const BACKEND_URL = "https://course-js.javascript.ru";

export default class ColumnChart extends ColumnChartParent {
  constructor(config) {
    super(config);
    console.log(this.config);
    console.log(this.element);
  }

  
}

// export default class ColumnChart {
//     chartHeight = 50;
//     mainElement = document.createElement("div");

//     constructor(config = {}) {
//       this.config = { ...config };
//       this.element = this.createMyElement();
//     }

//     title() {
//       const link = `<a href=${this.config?.link} class="column-chart__link">View all</a>`;
//       return this.config?.link
//         ? `${this.config?.label}` + link
//         : `${this.config?.label}`;
//     }

//     createElementBody() {
//       const parent = this.mainElement.getElementsByClassName('column-chart__chart')[0];
//       const containerBodyElementObject = document.createElement("div");

//       this.config?.data?.forEach((element, index) => {
//         let cloneElement = containerBodyElementObject.cloneNode();
//         const maxValue = Math.max(...this.config?.data);
//         cloneElement.key = index;
//         cloneElement.style = `--value: ${Math.floor(
//           (this.chartHeight * element) / maxValue
//         )}`;
//         cloneElement.dataset.tooltip = `${((element / maxValue) * 100).toFixed(
//           0
//         )}%`;
//         parent.appendChild(cloneElement);
//       });
//     }

//     containerObject() {
//       return (
//         `
//           <div class="column-chart__title">
//             ${this.title()}
//           </div>
//           <div class="column-chart__container">
//             <div data-element="header" class="column-chart__header">
//               ${
//                 this.config?.formatHeading
//                   ? this.config?.formatHeading(this.config?.value)
//                   : this.config?.value
//               }
//             </div>
//             <div data-element="body" class="column-chart__chart"/>
//           </div>
//       `
//       );
//     }

//     createMyElement() {
//       this.mainElement.className = "column-chart";
//       this.mainElement.style = "--chart-height: 50";
//       if (!this.config?.data || this.config?.data.length === 0) {
//         this.mainElement.classList.add("column-chart_loading");
//       }
//       this.mainElement.innerHTML = this.containerObject();
//       this.createElementBody();

//       return this.mainElement;
//     }

//     remove() {
//       this.element.remove();
//     }

//     destroy() {
//       this.remove();
//     }

//     update(value) {
//       this.config.data = value;
//       const parent = this.mainElement.getElementsByClassName('column-chart__chart')[0];
//       while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//       }
//       this.createElementBody();
//     }
//   }
