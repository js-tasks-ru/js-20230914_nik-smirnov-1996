export default class DoubleSlider {
  thumbRightPercent = 100;
  thumbLeftPercent = 0;
  subElements = {};

  constructor(config) {
    this.selected = config.selected;
    this.formatValue = config.formatValue;
    this.min = config.min ?? 100;
    this.max = config.max ?? 200;
    this.createSliderElement();
  }
  onDocumentPointerDown = () => {
    this.sliderRect = this.subElements.slider.getBoundingClientRect().left;
  };
  
  createSliderElement = () => {
    this.element = document.createElement("div");
    this.element.className = `range-slider`;
    this.element.innerHTML = `
    <span data-element="from">${
      this.formatValue ? this.formatValue(this.min) : this.min
    }</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress"></span>
      <span class="range-slider__thumb-left"></span>
      <span class="range-slider__thumb-right"></span>
    </div>
    <span data-element="to">${
      this.formatValue ? this.formatValue(this.max) : this.max
    }</span>
    `;

    if (this.selected) {
      this.thumbLeftPercent =
        ((this.selected.from - this.min) / (this.max - this.min)) * 100;
      this.thumbRightPercent =
        ((this.selected.to - this.min) / (this.max - this.min)) * 100;
    }

    this.subElements = {
      slider: this.element.querySelector(".range-slider__inner"),
      thumbLeft: this.element.querySelector(".range-slider__thumb-left"),
      thumbRight: this.element.querySelector(".range-slider__thumb-right"),
      leftValueLimit: this.element.querySelector('span[data-element="from"]'),
      rightValueLimit: this.element.querySelector('span[data-element="to"]'),
    };

    this.updateSlider();

    this.initialize();
  };

  onPointerDown = (event) => {
    const isLeftSlider = event.target.classList.contains(
      "range-slider__thumb-left"
    );

    const onPointerMove = (event) => {
      const clientX = event.clientX;
      let newLeft =
        clientX - this.subElements.slider.getBoundingClientRect().left;
      if (isLeftSlider) {
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
      } else {
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
      }

      this.updateSlider();
    };

    function onPointerUp() {
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
    }

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  initialize = () => {
    document.addEventListener("pointerdown", this.onPointerDown);
    this.subElements.slider.addEventListener("pointerdown", this.onPointerDown);
  };

  updateSlider = () => {
    this.subElements.thumbRight.style.right =
      100 - this.thumbRightPercent + "%";

    this.element.querySelector(".range-slider__progress").style.right =
      100 - this.thumbRightPercent + "%";
    const rightSelectedValue =
      this.min +
      Math.round(((this.max - this.min) * this.thumbRightPercent) / 100);
    this.subElements.rightValueLimit.innerHTML = this.formatValue
      ? this.formatValue(rightSelectedValue)
      : rightSelectedValue;

    this.subElements.thumbLeft.style.left = this.thumbLeftPercent + "%";

    this.element.querySelector(".range-slider__progress").style.left =
      this.thumbLeftPercent + "%";
    const leftSelectedValue =
      this.min +
      Math.round(((this.max - this.min) * this.thumbLeftPercent) / 100);
    this.subElements.leftValueLimit.innerHTML = this.formatValue
      ? this.formatValue(leftSelectedValue)
      : leftSelectedValue;
  };

  test() {
    const leftSlider = this.element.querySelector(".range-slider__thumb-left");
    const leftBoundary = this.element.querySelector(
      'span[data-element="from"]'
    );

    const down = new MouseEvent("pointerdown", {
      bubbles: true,
    });

    const up = new MouseEvent("pointerup", {
      bubbles: true,
    });

    const move = new MouseEvent("pointermove", {
      clientX: 0,
      bubbles: true,
    });

    leftSlider.dispatchEvent(down);
    leftSlider.dispatchEvent(move);
    leftSlider.dispatchEvent(up);
    console.log(leftBoundary);
    // expect(leftBoundary).toHaveTextContent(doubleSlider.min);
  }

  destroy() {
    document.removeEventListener("pointerdown", this.onPointerDown);
    this.element.remove();
    this.thumbRightPercent = 100;
    this.thumbLeftPercent = 0;
    this.subElements = {};
  }
}
