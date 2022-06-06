import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/const.js';

export default class EventsModel extends Observable {
  #eventsApiService = null;
  #events = [];
  #offers = [];
  #destinations = [];

  constructor (eventsApiService) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const events = await this.#eventsApiService.events;
      this.#offers = await this.#eventsApiService.offers;
      this.#destinations = await this.#eventsApiService.destinations;
      this.#events = events.map(this.#adaptToClient);
    } catch(err) {
      this.#events = [];
      this.#offers = [];
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  };

  updateEvent = async (updateType, update) => {
    const index = this.#events.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event. Update: ${update}`);
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);

      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1)
      ];

      this._notify(updateType, updatedEvent);

    } catch(err) {
      throw new Error('Can\'t update task');
    }
  };

  addEvent = async (updateType, update) => {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch {
      throw new Error('Can\'t add event');
    }
  };

  deleteEvent = async (updateType, update) => {
    const deletedIndex = this.#events.findIndex((item) => item.id === update.id);

    if (deletedIndex === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = this.#events.filter((_item, index) => index !== deletedIndex);
      this._notify(updateType);
    } catch {
      throw new Error('Can\'t delete event');
    }
  };

  #adaptToClient = (event) => {
    const adaptedEvent = {...event,
      basePrice: event['base_price'],
      dateFrom: new Date(event['date_from']),
      dateTo: new Date(event['date_to']),
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['base_price'];
    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  };
}
