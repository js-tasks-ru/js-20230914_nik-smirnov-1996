export default class NotificationMessage {
  static isModalShowed = false;

  constructor(...config) {
    this.message = config[0];
    this.duration = config[1]?.duration;
    this.type = config[1]?.type;
    this.element = this.createModalElement();
  }

  addModal() {
    return `
        <div class="timer"></div>
        <div class="inner-wrapper">
            ${
              this.type
                ? `<div class="notification-header">${this?.type}</div>`
                : ""
            }
            ${
              this.message
                ? `<div class="notification-body"> ${this.message} </div>`
                : ""
            }
        </div>
    `;
  }

  remove() {
    NotificationMessage.isModalShowed = false;
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

  createModalElement() {
    let element = document.createElement("div");
    element.className = `notification ${this.type ?? ""}`;
    element.style = `--value: ${this.duration / 1000}s`;
    element.innerHTML = this.addModal();
    return element;
  }

  show(parent = document.body) {
    if (NotificationMessage.isModalShowed) {
      return;
    }
    NotificationMessage.isModalShowed = true;
    parent.append(this.element);
    setTimeout(() => {
      this.remove();
    }, this.duration);
  }
}
