class Tooltip {
  constructor() {
    this.element = this.createTooltipElement();
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    return (Tooltip.instance = this);
  }

  createTooltipElement() {
    const element = document.createElement("div");
    element.className = `tooltip`;
    return element;
  }

  initialize() {
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
    document.body.removeEventListener("mouseenter", () => {
      this.render();
    });
    document.body.removeEventListener("mousemove", this.changePosition);
    document.body.removeEventListener("mouseleave", () => {
      this.remove();
    });
    this.remove();
  }

  test() {
    const pointerover = new MouseEvent("pointerover", {
      bubbles: true,
    });
    const container = document.querySelector('[data-tooltip="bar-bar-bar"]');
    console.log("container:", container);
    container.dispatchEvent(pointerover);
    console.log("here:", this.element);
  }
}

export default Tooltip;

