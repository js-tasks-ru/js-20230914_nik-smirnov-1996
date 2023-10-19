export default class DoubleSlider {
  thumbLeftPercent = 0;
  thumbRightPercent = 100;
  subElements = {};

  constructor(config) {
    this.formatValue = config.formatValue;
    this.min = config.min ?? 100;
    this.max = config.max ?? 200;
    this.selected = config.selected ?? { from: this.min, to: this.max };
    this.thumbLeftPercent = this.normalizeEdge(this.selected.from);
    this.thumbRightPercent = this.normalizeEdge(this.selected.to);

    this.createElement();
    this.selectSubElements();
    this.createEventListeners();
    this.renderThumbs();
  }

  minmax = (value, min, max) => Math.max(min, Math.min(max, value));
  normalizeEdge = (edge) => ((edge - this.min) / (this.max - this.min)) * 100;
  percentToValue = (value) => this.min + ((this.max - this.min) * value) / 100;

  createTemplate = () => {
    return `
      <span data-element="from">
        ${this.formatValue ? this.formatValue(this.min) : this.min}
      </span>
      <div class="range-slider__inner">
        <span class="range-slider__progress"></span>
        <span class="range-slider__thumb-left"></span>
        <span class="range-slider__thumb-right"></span>
      </div>
      <span data-element="to">
        ${this.formatValue ? this.formatValue(this.max) : this.max}
      </span>
    `;
  };

  createElement = () => {
    this.element = document.createElement("div");
    this.element.className = `range-slider`;
    this.element.innerHTML = this.createTemplate();
  };

  selectSubElements() {
    this.subElements = {
      slider: this.element.querySelector(".range-slider__inner"),
      thumbLeft: this.element.querySelector(".range-slider__thumb-left"),
      thumbRight: this.element.querySelector(".range-slider__thumb-right"),
      leftValueLimit: this.element.querySelector('span[data-element="from"]'),
      rightValueLimit: this.element.querySelector('span[data-element="to"]'),
    };
  }

  createEventListeners = () => {
    this.subElements.slider.addEventListener("pointerdown", this.onPointerDown);
  };

  destroyEventListeners = () => {
    this.subElements.slider.removeEventListener(
      "pointerdown",
      this.onPointerDown
    );
    document.removeEventListener("pointerup", this.onPointerUp);
    document.removeEventListener("pointermove", this.onPointerMove);
  };

  onPointerMove = (event) => {
    const sliderRect = this.subElements.slider.getBoundingClientRect();

    const clickX = event.clientX;
    const sliderLeftX = sliderRect.left;
    const sliderRightX = sliderLeftX + sliderRect.width;

    const normalaziedClickX = this.minmax(clickX, sliderLeftX, sliderRightX);

    const percent = normalaziedClickX
      ? ((normalaziedClickX - sliderLeftX) / (sliderRightX - sliderLeftX)) * 100
      : 0;

    const leftPercent = this.normalizeEdge(this.selected.from);
    const rightPercent = this.normalizeEdge(this.selected.to);

    if (this.isLeftSlider) {
      this.thumbLeftPercent = this.minmax(percent, 0, rightPercent);
    } else {
      this.thumbRightPercent = this.minmax(percent, leftPercent, 100);
    }

    if (this.isLeftSlider) {
      this.selected.from = this.percentToValue(this.thumbLeftPercent);
    } else {
      this.selected.to = this.percentToValue(this.thumbRightPercent);
    }
    this.renderThumbs();
  };

  onPointerUp = () => {
    this.element.dispatchEvent(
      new CustomEvent("range-select", {
        detail: this.selected,
        bubbles: true,
      })
    );

    document.removeEventListener("pointerup", this.onPointerUp);
    document.removeEventListener("pointermove", this.onPointerMove);
  };

  onPointerDown = (event) => {
    this.isLeftSlider = event.target.classList.contains(
      "range-slider__thumb-left"
    );

    document.addEventListener("pointerup", this.onPointerUp);
    document.addEventListener("pointermove", this.onPointerMove);
  };

  renderThumbs = () => {
    const progressElement = this.element.querySelector(
      ".range-slider__progress"
    );

    this.subElements.thumbRight.style.right =
      100 - this.thumbRightPercent + "%";
    this.subElements.thumbLeft.style.left = this.thumbLeftPercent + "%";

    progressElement.style.left = this.thumbLeftPercent + "%";
    progressElement.style.right = 100 - this.thumbRightPercent + "%";

    this.subElements.leftValueLimit.innerHTML = this.formatValue
      ? this.formatValue(Math.round(this.selected.from))
      : Math.round(this.selected.from);

    this.subElements.rightValueLimit.innerHTML = this.formatValue
      ? this.formatValue(Math.round(this.selected.to))
      : Math.round(this.selected.to);
  };

  remove() {
    this.element.remove();
  }

  destroy() {
    this.destroyEventListeners();
    this.remove();
    this.thumbRightPercent = 100;
    this.thumbLeftPercent = 0;
  }
}
