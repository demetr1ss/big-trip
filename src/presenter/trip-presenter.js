import EventPresenter from './event-presenter.js';
import SortView, { SortType } from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import { render } from '../framework/render.js';
import { updateItem, sortEventsByDay, sortEventsByPrice, sortEventsByTime } from '../util.js';

export default class TripPresenter {
  #container = null;
  #eventModel = null;

  #componentList = new EventListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();

  #eventList = [];
  #eventPresenter = new Map();

  #currentSortType = SortType.DAY;
  #sourcedEventList = [];

  constructor(container, eventModel) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventList = [...this.#eventModel.points];
    this.#sourcedEventList = [...this.#eventModel.points];

    this.#renderTrip();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#eventList = updateItem(this.#eventList, updatedEvent);
    this.#sourcedEventList = updateItem(this.#sourcedEventList, updatedEvent);
    this.#eventPresenter.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#eventList.sort(sortEventsByDay);
        break;

      case SortType.TIME:
        this.#eventList.sort(sortEventsByTime);
        break;

      case SortType.PRICE:
        this.#eventList.sort(sortEventsByPrice);
        break;

      default:
        this.#eventList = [...this.#sourcedEventList];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderComponentList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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
