import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsTextType } from '../utils/const.js';

const createNoEventTemplate = (filterType) => {
  const noEventsTextValue = NoEventsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noEventsTextValue}</p>`
  );
};

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventTemplate(this.#filterType);
  }
}
