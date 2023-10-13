class Tooltip {
  constructor() {
    this.element = this.createTooltipElement();
  }

  createTooltipElement() {
    const element = document.createElement("div");
    element.className = `tooltip`;
    element.innerHTML = "test";
    element.setAttribute("pointer-events", "none");
    return element;
  }

  initialize() {
    const parent = document.body;
    parent.onpointerover = this.render;
    parent.onpointermove = this.changePosition;
    parent.onpointerout = this.remove;
  }

  changePosition = (event) => {
    console.log("changePosition");
    const target = event.target;
    if (event.target === this.element) {
      return;
    }
    const text = target.getAttribute("data-tooltip");
    const localX = event.clientX + 10;
    const localY = event.clientY + 10;
    this.element.innerHTML = text;

    this.element.style.left = `${localX}px`;
    this.element.style.top = `${localY}px`;
  };

  render = () => {
    console.log("render");
    document.body.append(this.element);
  };

  remove = () => {
    console.log("remove");
    this.element.remove();
  };

  destroy() {
    this.remove();
  }
}

// export default Tooltip;


// class Tooltip {
//   constructor() {
//     this.element = this.createTooltipElement();
//   }

//   createTooltipElement() {
//     const element = document.createElement("div");
//     element.className = `tooltip`;
//     element.innerHTML = "test";
//     element.setAttribute("pointer-events", "none");
//     return element;
//   }

//   initialize() {
//     const parent = document.body;
//     this.render();
//     parent.onpointerover = parent.onpointermove = this.changePosition;
//     parent.onpointerout = this.hideTooltip;
//   }

//   changePosition = (event) => {
//     const target = event.target;
//     if (event.target === this.element) {
//       return;
//     }
//     const text = target.getAttribute("data-tooltip");
//     const localX = event.clientX + 10;
//     const localY = event.clientY + 10;
//     this.element.innerHTML = text;

//     this.element.style.left = `${localX}px`;
//     this.element.style.top = `${localY}px`;
//     if (this.element.hidden) {
//       this.element.hidden = false;
//     }
//   };

//   render = () => {
//     // this.element.hidden = true;
//     document.body.append(this.element);
//   };

//   remove = () => {
//     this.element.remove();
//   };

//   hideTooltip = () => {
//     this.element.hidden = true;
//   };

//   destroy() {
//     this.remove();
//   }
// }

// export default Tooltip;
