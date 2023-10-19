class Tooltip {
  static instance;

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }
    Tooltip.instance = this;
  }

  onDocumentPointerOver = (e) => {
    const element = e.target.closest("[data-tooltip]");

    if (!element) {
      return;
    }

    this.render(element.getAttribute("data-tooltip"));
  };

  onDocumentPointerMove = (event) => {
    if (event.target === this.element) {
      return;
    }

    const tooltipPositionX = event.pageX + 5;
    const tooltipPositionY = event.pageY + 5;

    this.element.style.left = `${tooltipPositionX}px`;
    this.element.style.top = `${tooltipPositionY}px`;
  };

  onDocumentPointerLeave = (e) => {
    this.remove();
  };

  // from test
  initialize() {
    this.element = this.createElement();

    document.addEventListener("pointerover", this.onDocumentPointerOver);
    document.addEventListener("pointermove", this.onDocumentPointerMove);
    document.addEventListener("pointerout", this.onDocumentPointerLeave);
  }

  createElement = () => {
    const element = document.createElement("div");

    element.style.position = "absolute";
    element.className = `tooltip`;

    return element;
  };

  render = (content) => {
    this.element.textContent = content;

    document.body.append(this.element);
  };
  remove() {
    this.element.remove();
  }

  destroy() {
    document.removeEventListener("pointerover", this.onDocumentPointerOver);
    document.removeEventListener("pointermove", this.onDocumentPointerMove);
    document.removeEventListener("pointerout", this.onDocumentPointerLeave);

    this.remove();
  }
}

export default Tooltip;
