import { createElement } from '../render.js';

const createNoEventTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class NoEventView {
  #element = null;

  get template() {
    return createNoEventTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }


  removeElement() {
    this.#element = null;
  }
}
