import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import { render } from '../framework/render.js';
export default class TripPresenter {
  #container = null;
  #eventModel = null;

  #componentList = new EventListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();

  #eventList = [];

  constructor(container, eventModel) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventList = [...this.#eventModel.points];
    this.#renderTrip();
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
    const eventPresenter = new EventPresenter(this.#componentList.element);
    eventPresenter.init(item);
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
