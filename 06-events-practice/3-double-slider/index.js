export default class DoubleSlider {
  thumbRightPercent = 100;
  thumbLeftPercent = 0;
  subElements = {};
  element = document.createElement("div");

  constructor(config) {
    this.selected = config.selected;
    this.formatValue = config.formatValue;
    this.range = { min: config.min ?? 100, max: config.max ?? 100 };
    this.createSliderElement();
  }

  createSliderElement = () => {
    this.element.className = `range-slider`;
    this.element.innerHTML = `
    <span id='leftValueLimit'>${
      this.formatValue ? this.formatValue(this.range.min) : this.range.min
    }</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress"></span>
      <span class="range-slider__thumb-left"></span>
      <span class="range-slider__thumb-right"></span>
    </div>
    <span id='rightValueLimit'>${
      this.formatValue ? this.formatValue(this.range.max) : this.range.max
    }</span>
    `;

    if (this.selected) {
      this.thumbLeftPercent =
        ((this.selected.from - this.range.min) /
          (this.range.max - this.range.min)) *
        100;
      this.thumbRightPercent =
        ((this.selected.to - this.range.min) /
          (this.range.max - this.range.min)) *
        100;
    }

    this.initialize();
  };

  initialize = () => {
    this.subElements = {
      slider: this.element.querySelector(".range-slider__inner"),
      thumbLeft: this.element.querySelector(".range-slider__thumb-left"),
      thumbRight: this.element.querySelector(".range-slider__thumb-right"),
      leftValueLimit: this.element.querySelector("[id = 'leftValueLimit']"),
      rightValueLimit: this.element.querySelector("[id = 'rightValueLimit']"),
    };
    console.log("left:", this.subElements.thumbLeft);

    this.updateSlider();

    this.subElements.thumbLeft.onmousedown = (event) => {
      event.preventDefault();

      const onMouseMove = (event) => {
        const clientX = event.clientX;
        let newLeft =
          clientX - this.subElements.slider.getBoundingClientRect().left;

        if (newLeft < 0) {
          newLeft = 0;
        }

        if (
          newLeft >
          this.subElements.thumbRight.getBoundingClientRect().left -
            this.subElements.slider.getBoundingClientRect().left
        ) {
          newLeft =
            this.subElements.thumbRight.getBoundingClientRect().left -
            this.subElements.slider.getBoundingClientRect().left;
        }

        this.thumbLeftPercent =
          (newLeft / this.subElements.slider.offsetWidth) * 100;

        this.updateSlider();
      };

      function onMouseUp() {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    this.subElements.thumbRight.onmousedown = (event) => {
      event.preventDefault();

      const onMouseMove = (event) => {
        const clientX = event.clientX;
        let newLeft =
          clientX - this.subElements.slider.getBoundingClientRect().left;

        if (
          newLeft <
          this.subElements.thumbLeft.getBoundingClientRect().right -
            this.subElements.slider.getBoundingClientRect().left
        ) {
          newLeft =
            this.subElements.thumbLeft.getBoundingClientRect().right -
            this.subElements.slider.getBoundingClientRect().left;
        }

        if (newLeft > this.subElements.slider.offsetWidth) {
          newLeft = this.subElements.slider.offsetWidth;
        }

        this.thumbRightPercent =
          (newLeft / this.subElements.slider.offsetWidth) * 100;
        this.updateSlider();
      };

      function onMouseUp() {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
  };

  updateSlider = () => {
    this.subElements.thumbRight.style.right = 100 - this.thumbRightPercent + "%";

    this.element.querySelector(".range-slider__progress").style.right =
      100 - this.thumbRightPercent + "%";
    const rightSelectedValue =
      this.range.min +
      Math.round(
        ((this.range.max - this.range.min) * this.thumbRightPercent) / 100
      );
    this.subElements.rightValueLimit.innerHTML = this.formatValue
      ? this.formatValue(rightSelectedValue)
      : rightSelectedValue;

    this.subElements.thumbLeft.style.left = this.thumbLeftPercent + "%";

    this.element.querySelector(".range-slider__progress").style.left =
      this.thumbLeftPercent + "%";
    const leftSelectedValue =
      this.range.min +
      Math.round(
        ((this.range.max - this.range.min) * this.thumbLeftPercent) / 100
      );
    this.subElements.leftValueLimit.innerHTML = this.formatValue
      ? this.formatValue(leftSelectedValue)
      : leftSelectedValue;
  };
}
