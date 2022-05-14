import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import { render } from '../framework/render.js';
import { updateItem } from '../util.js';
export default class TripPresenter {
  #container = null;
  #eventModel = null;

  #componentList = new EventListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();

  #eventList = [];
  #eventPresenter = new Map();

  constructor(container, eventModel) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventList = [...this.#eventModel.points];
    this.#renderTrip();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#eventList = updateItem(this.#eventList, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
  };

  #renderComponentList = () => {
    render(this.#componentList, this.#container);
  };

  #renderNoEvents = () => {
    render(this.#noEventComponent, this.#container);
  };

  #renderEvent = (item) => {
    const eventPresenter = new EventPresenter(this.#componentList.element, this.#handleEventChange, this.#handleModeChange);
    eventPresenter.init(item);
    this.#eventPresenter.set(item.id, eventPresenter);
  };

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderTrip = () => {
    if (!this.#eventList.length) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSort();
    this.#renderComponentList();

    this.#eventList.forEach(this.#renderEvent);
  };
}
