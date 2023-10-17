class Tooltip {
  element = document.createElement("div");

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance
    }
    Tooltip.instance = this;
  }
  initialize() {
    this.element.className = `tooltip`;

    const parent = document.body;
    parent.addEventListener("mouseenter", this.render);
    parent.addEventListener("mousemove", this.changePosition);
    parent.addEventListener("mouseleave", this.remove);
  }

  changePosition = (event) => {
    if (event.target === this.element) {
      return;
    }
    const text = event.target.getAttribute("data-tooltip");
    const tooltipPositionX = event.pageX + 5;
    const tooltipPositionY = event.pageY + 5;
    this.element.innerHTML = text;

    this.element.style.left = `${tooltipPositionX}px`;
    this.element.style.top = `${tooltipPositionY}px`;
  };

  render = () => {
    document.body.append(this.element);
  };

  remove = () => {
    this.element.remove();
  };

  destroy() {
    document.body.removeEventListener("mouseenter", this.render);
    document.body.removeEventListener("mousemove", this.changePosition);
    document.body.removeEventListener("mouseleave", this.remove);
    this.remove();
  }
}

export default Tooltip;
