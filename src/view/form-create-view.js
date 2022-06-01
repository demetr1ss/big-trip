import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/airbnb.css';
import dayjs from 'dayjs';
import { getEventOffers, allCityes } from '../mock/generate-trip-event.js';
import { OFFER_TYPES } from '../utils/const.js';
import { formatDate } from '../utils/date.js';
import { DESTINATIONS } from '../mock/destinations.js';

const BLANK_EVENT = {
  basePrice: '',
  dateFrom: `${dayjs()}`,
  dateTo: `${dayjs().add('14', 'd')}`,
  destination: {
    description: '',
    name: '',
    pictures: []
  },
  offers: [],
  type: 'sightseeing'
};

const createFormTemplate = (event = BLANK_EVENT) => {
  const {
    dateFrom,
    dateTo,
    type,
    destination,
    basePrice,
    offers,
  } = event;

  const allAvailableOptions = getEventOffers(type).offers;
  const hideOffersContainer = () => !allAvailableOptions.length ? 'visually-hidden' : '';
  const hideDestinationContainer = () => !destination.description && !destination.pictures.length
    ? 'visually-hidden'
    : '';

  return (`
    <li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
          <header class="event__header">
            <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
                <span class="visually-hidden">Choose event type</span>
                <img
                  class="event__type-icon"
                  width="17" 
                  height="17"
                  src="img/icons/${type}.png" 
                  alt="Event type icon"
                >
              </label>
              <input
                class="event__type-toggle
                visually-hidden" 
                id="event-type-toggle-1" 
                type="checkbox"
              >

          <div class="event__type-list">
                <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>
                  ${OFFER_TYPES.map((item) => (`
                  <div class="event__type-item">
                    <input
                      id="event-type-${item}-1"
                      class="event__type-input  visually-hidden" 
                      type="radio"
                      name="event-type" 
                      value="${item}"
                      ${item === type ? 'checked' : ''}
                    >
                    <label
                      class="event__type-label  
                      event__type-label--${item}" 
                      for="event-type-${item}-1"
                      data-type=${item}
                    >
                      ${item}
                    </label>
                  </div>
                  `)).join ('')}
                </fieldset>
              </div>
            </div>

            <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input 
              class="event__input  event__input--destination" 
              id="event-destination-1" 
              type="text" name="event-destination" 
              value="${he.encode(destination.name)}" 
              list="destination-list-1"
              required
              autocomplete="off"
            >
            <datalist id="destination-list-1">
              ${allCityes().map((city) => `<option value=${city}></option>`).join('')}
            </datalist>
          </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input  event__input--time" 
            id="event-start-time-1" 
            type="text" 
            name="event-start-time" 
            value="${formatDate(dateFrom,'DD/MM/YY HH:mm')}"
            required
          >
            &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${formatDate(dateTo,'DD/MM/YY HH:mm')}"
            required
          >
        </div>

        <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
                <span class="visually-hidden">Price</span>
                  &euro;
              </label>
              <input 
                class="event__input  event__input--price" 
                id="event-price-1" 
                type="number" 
                name="event-price" 
                value="${basePrice}"
                required
                autocomplete="off"
                min="1"
              >
            </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        <section class="event__section  event__section--offers ${hideOffersContainer()}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
        ${allAvailableOptions.map((item) => {
      const checked = offers.includes(item.id) ? 'checked' : '';

      return (`
          <div class="event__offer-selector">
          <input
            class="event__offer-checkbox  visually-hidden" 
            id=1-${item.id} 
            type="checkbox" 
            name="event-offer-${item.title}" 
            ${checked}
          >
          <label class="event__offer-label" for=1-${item.id}>
            <span class="event__offer-title">${item.title}</span>
              &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>
      `);
    }).join('')}
      </div>
    </section>
    <section class="event__section  event__section--destination ${hideDestinationContainer()}">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        ${destination.description}
      </p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
        ${destination.pictures.map((photo) => (`
          <img class="event__photo" src="${photo.src}" alt="${photo.description}">
          `)).join('')}
        </div>
      </div>
    </section>
  </section>
  </form>
  </li>
`);
};

export default class FormCreateView extends AbstractStatefulView {
  #dateFromPicker = null;
  #dateToPicker = null;

  constructor() {
    super();
    this._state = FormCreateView.parseDataToState(BLANK_EVENT);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormTemplate(this._state);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  setCancelClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#cancelClickHandler);
  };

  reset = (event) => {
    this.updateElement(
      FormCreateView.parseDataToState(event),
    );
  };

  removeElement = () => {
    super.removeElement();

    if (this.#dateFromPicker && this.#dateToPicker) {
      this.#dateFromPicker.destroy();
      this.#dateToPicker.destroy();
      this.#dateFromPicker = null;
      this.#dateToPicker = null;
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCancelClickHandler(this._callback.deleteClick);
    this.#setDateToPicker();
    this.#setDateFromPicker();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FormCreateView.parseStateToData(this._state));
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(FormCreateView.parseStateToData(this._state));
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.value = Math.floor(Math.abs(evt.target.value));
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const destination = DESTINATIONS.find((item) => item.name === evt.target.value);

    if (!destination){
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.value;

    if (value) {
      this.updateElement({
        type: value,
        offers: []
      });
    }
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const currentId = Number(evt.target.id.split('-')[1]);
    const stateOffers = this._state.offers;

    const updatedOffers = stateOffers.includes(currentId)
      ? stateOffers.filter((item) => item !== currentId)
      : stateOffers.concat(currentId);

    this.updateElement({
      offers: updatedOffers
    });
  };

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: userDateTo,
    });
  };


  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offersChangeHandler);

    this.element.querySelector('input[name="event-start-time"]')
      .addEventListener('focus', this.#setDateFromPicker);

    this.element.querySelector('input[name="event-end-time"]')
      .addEventListener('focus', this.#setDateToPicker);
  };

  #setDateFromPicker = () => {
    this.#dateFromPicker = flatpickr (
      this.element.querySelector('input[name="event-start-time"]'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        maxDate: this._state.dateTo,
        onClose: this.#dateFromChangeHandler,
      }
    );
  };

  #setDateToPicker = () => {
    this.#dateToPicker = flatpickr (
      this.element.querySelector('input[name="event-end-time"]'),
      {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToChangeHandler,
      },
    );
  };

  static parseDataToState = (data) => ({ ...data });
  static parseStateToData = (state) => ({ ...state });
}
