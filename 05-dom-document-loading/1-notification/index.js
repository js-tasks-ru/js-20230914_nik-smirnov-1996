export default class NotificationMessage {
  static lastMessage;
  timerId;

  constructor(message, {
    duration = 2000,
    type = 'success',
  } = {}) {
    this.message = message;
    this.duration = duration;
    this.type = type;
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
    this.element.remove();
  }

  destroy() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.remove();
  }

  createModalElement() {
    const element = document.createElement("div");
    element.className = `notification ${this.type ?? ""}`;
    element.style = `--value: ${this.duration / 1000}s`;
    element.innerHTML = this.addModal();
    return element;
  }

  show(parent = document.body) {
    if (NotificationMessage.lastMessage) {
      NotificationMessage.lastMessage.destroy();
    }
    NotificationMessage.lastMessage = this;

    parent.append(this.element);
    this.timerId = setTimeout(() => {
      this.remove();
    }, this.duration);
    console.log("test:", this.timerId);
  }
}
