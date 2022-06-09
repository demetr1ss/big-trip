import AbstractView from '../framework/view/abstract-view.js';
import { formatDate, getDurationTime } from '../utils/date.js';
import { getEventOffers } from '../utils/point.js';

const createEventTemplate = (event, allOffers) => {
  const {
    basePrice,
    destination,
    type,
    dateFrom,
    dateTo,
    offers,
    isFavorite,
  } = event;

  const chosenOptions = getEventOffers(allOffers, type).offers;
  const favoriteClassName = isFavorite ?
    'event__favorite-btn  event__favorite-btn--active':
    'event__favorite-btn';

  return (
    `<li class="trip-events__item">
     <div class="event">
      <time class="event__date datetime="${formatDate(dateFrom, 'YYYY-MM-DD')}">
        ${formatDate(dateFrom, 'DD MMM')}
      </time>
      <div class="event__type">
          <img 
            class="event__type-icon" 
            width="42" height="42" 
            src="img/icons/${type}.png" 
            alt="Event type icon"
          >
      </div>
      <h3 class="event__title">${type} ${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time
           class="event__start-time"
           datetime="${formatDate(dateFrom, 'YYYY-MM-DDTHH:mm')}"
          >
           ${formatDate(dateFrom, 'HH:mm')}
          </time>
            &mdash;
          <time
           class="event__end-time"
           datetime="${formatDate(dateTo, 'YYYY-MM-DDTHH:mm')}"
          >
           ${formatDate(dateTo, 'HH:mm')}
          </time>
        </p>
        <p class="event__duration">${getDurationTime(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
     <ul class="event__selected-offers">
     ${chosenOptions.map((item) => offers.includes(item.id)
      ? `<li class="event__offer">
       <span class="event__offer-title">${item.title}</span>
          &plus;&euro;&nbsp;
       <span class="event__offer-price">${item.price}</span>
      </li>`
      : '').join('')}
     </ul>
     <button class="${favoriteClassName}" type="button">
     <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M14 21l-8.22899
          4.3262 1.57159-9.1631L.685209 9.67376 9.8855
          8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574
          6.48934 1.5716 9.1631L14 21z"
        />
      </svg>
     </button>
     <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
     </button>
    </div>
  </li>`);
};


export default class EventView extends AbstractView {
  #event = null;
  #offers = null;

  constructor(item, offers) {
    super();
    this.#event = item;
    this.#offers = offers;
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  #editClickHandler = () => {
    this._callback.editClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
