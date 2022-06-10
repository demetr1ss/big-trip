import AbstractView from '../framework/view/abstract-view.js';
import { sortEventsDefault } from '../utils/sorting.js';
import { getOffersCost } from '../utils/point.js';
import { formatDate } from '../utils/date.js';
import { TripInfoLength } from '../utils/const.js';

const createTripInfoTemplate = (sortedEvents, tripCost, tripDestinations) => {
  const startDate = formatDate(sortedEvents[0].dateFrom, 'MMM DD');
  const endDate = formatDate(sortedEvents.at(-1).dateTo, 'MMM DD');

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
            <h1 class="trip-info__title">${tripDestinations}</h1>
            <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
        </div>
        <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripCost}</span>
        </p>
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #sortedEvents = null;
  #allOffers = null;

  constructor (events, offers) {
    super();
    this.#sortedEvents = events.sort(sortEventsDefault);
    this.#allOffers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#sortedEvents, this.#getTripCost(), this.#getTripDestinations(), );
  }

  #getTripDestinations = () => {
    const firstPoint = this.#sortedEvents[0].destination.name;
    const endPoint = this.#sortedEvents.at(-1).destination.name;

    if (this.#sortedEvents.length === TripInfoLength.MIN_LENGTH) {
      return `${firstPoint}`;
    }

    if (this.#sortedEvents.length <= TripInfoLength.MAX_LENGTH) {
      return this.#sortedEvents.map(({destination}) => `${destination.name}`).join(' &mdash; ');
    }

    return `${firstPoint} &mdash; .&nbsp.&nbsp.  &mdash; ${endPoint}`;
  };

  #getTripCost = () => this.#sortedEvents.reduce(
    (sum, {offers, type, basePrice}) => {
      const offersCost = getOffersCost(this.#allOffers, offers, type);
      sum += offersCost + basePrice;

      return sum;
    }, 0);
}
