export default class DoubleSlider {
  #leftPercent;
  #rightPercent;
  constructor(config) {
    this.selected = config.selected;
    this.formatValue = config.formatValue;
    this.range = { min: config.min, max: config.max };
    this.element = this.createSliderElement();
  }

  createSliderElement = () => {
    const element = document.createElement("div");
    element.className = `range-slider`;
    element.innerHTML = `
    <span>${
      this.formatValue ? this.formatValue(this.range.min) : this.range.min
    }</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress"></span>
      <span class="range-slider__thumb-left"></span>
      <span class="range-slider__thumb-right"></span>
    </div>
    <span>${
      this.formatValue ? this.formatValue(this.range.max) : this.range.max
    }</span>
    `;
    this.initialize(element);
    return element;
  };

  initialize(element) {
    const slider = element.querySelector(".range-slider__inner");
    const thumbLeft = element.querySelector(".range-slider__thumb-left");
    const thumbRight = element.querySelector(".range-slider__thumb-right");

    thumbLeft.onmousedown = (event) => {
      console.log("slider:", slider);
      event.preventDefault();

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      function onMouseMove(event) {
        const clientX = event.clientX;
        let newLeft = clientX - slider.getBoundingClientRect().left;

        if (newLeft < 0) {
          newLeft = 0;
        }

        if (
          newLeft >
          thumbRight.getBoundingClientRect().left -
            slider.getBoundingClientRect().left
        ) {
          newLeft =
            thumbRight.getBoundingClientRect().left -
            slider.getBoundingClientRect().left;
        }

        console.log("newLeft:", newLeft);
        console.log(slider.offsetWidth);
        // this.#rightPercent = (newLeft / slider.offsetWidth) * 100;
        // const percent = Math.floor((newLeft / slider.offsetWidth) * 100);
        const percent = (newLeft / slider.offsetWidth) * 100;

        thumbLeft.style.left = newLeft + "px";
        element.querySelector(".range-slider__progress").style.left = percent + '%';
      }

      function onMouseUp() {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
    };

    thumbRight.onmousedown = (event) => {
      event.preventDefault();

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      function onMouseMove(event) {
        const clientX = event.clientX;
        let newLeft = clientX - slider.getBoundingClientRect().left;

        if (
          newLeft <
          thumbLeft.getBoundingClientRect().right -
            slider.getBoundingClientRect().left
        ) {
          newLeft =
            thumbLeft.getBoundingClientRect().right -
            slider.getBoundingClientRect().left;
        }

        if (newLeft > slider.offsetWidth) {
          newLeft = slider.offsetWidth;
        }

        // thumbRight.style.left = newLeft + "px";

        const percent = 100 - (newLeft / slider.offsetWidth) * 100;

        thumbRight.style.left = newLeft + "px";
        element.querySelector(".range-slider__progress").style.right = percent + '%';
      }

      function onMouseUp() {
        document.removeEventListener("mouseup", onMouseUp);
        document.removeEventListener("mousemove", onMouseMove);
      }
    };
  }
}

// {
//     min: 100,
//     max: 200,
//     formatValue: value => '$' + value,
//     selected: {
//       from: 120,
//       to: 150
//     }

// {
/* <div class="range-slider">
    <span>$10</span>
    <div class="range-slider__inner">
      <span class="range-slider__progress"></span>
      <span class="range-slider__thumb-left"></span>
      <span class="range-slider__thumb-right"></span>
    </div>
    <span>$100</span>
  </div> */
// }

// thumbRight.onmousedown = (event) => {
//   event.preventDefault();
//   let shiftX = event.clientX - thumbRight.getBoundingClientRect().left;

//   document.addEventListener("mousemove", onMouseMove);
//   document.addEventListener("mouseup", onMouseUp);

//   function onMouseMove(event) {
//     let newLeft =
//       event.clientX - shiftX - slider.getBoundingClientRect().left;
//     // console.log("thumbRight.getBoundingClientRect().left:", thumbRight.getBoundingClientRect().right)

//     if (
//       newLeft <
//       slider.offsetWidth - thumbLeft.getBoundingClientRect().right
//     ) {
//       newLeft = thumbLeft.getBoundingClientRect().right;
//     }
//     let rightEdge = slider.offsetWidth;
//     if (newLeft > rightEdge) {
//       newLeft = rightEdge;
//     }

//     thumbRight.style.left = newLeft + "px";
//   }

//   function onMouseUp() {
//     document.removeEventListener("mouseup", onMouseUp);
//     document.removeEventListener("mousemove", onMouseMove);
//   }
//   // console.log("event:", event);
// };
