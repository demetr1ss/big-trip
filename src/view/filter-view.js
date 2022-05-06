import { createElement } from '../render.js';

const FILTER_VALUES = ['everything', 'future', 'past'];

const createFilterTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    ${FILTER_VALUES.map((value) =>
    `<div class="trip-filters__filter">
      <input id="filter-${value}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${value}">
      <label class="trip-filters__filter-label" for="filter-${value}">${value}</label>
    </div>`).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class FilterView {
  #element = null;

  get template() {
    return createFilterTemplate();
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
