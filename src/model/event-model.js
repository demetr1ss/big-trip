import { generateTripEvent } from '../mock/generate-trip-event.js';
import Observable from '../framework/observable.js';

export default class EventsModel extends Observable {
  #events = Array.from({length: 10}, generateTripEvent);

  get events() {
    return this.#events;
  }

  updateEvent = (updateType, update) => {
    const index = this.#events.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event. Update: ${update}`);
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1)
    ];

    this._notify(updateType, update);
  };

  addEvent = (updateType, update) => {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  };

  deleteEvent = (updateType, update) => {
    const deletedIndex = this.#events.findIndex((item) => item.id === update.id);

    if (deletedIndex === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = this.#events.filter((_item, index) => index !== deletedIndex);

    this._notify(updateType);
  };
}
