import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../utils/sorting.js';

const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
   ${Object.values(SortType).map((item) =>
    `<div class="trip-sort__item  trip-sort__item--${item}">
        <input
          id="sort-${item}" 
          class="trip-sort__input  visually-hidden" 
          type="radio" name="trip-sort" 
          value="sort-${item}"
          data-sort-type="${item}"
          ${item === 'day' ? 'checked' : ''}
          ${item === 'event' ? 'disabled' : ''}
          ${item === 'offer' ? 'disabled' : ''}
        >
        <label class="trip-sort__btn" for="sort-${item}">${item}</label>
      </></div>`)
    .join('')}
  </form>`;

export default class SortView extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
