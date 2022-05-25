import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import { render } from '../framework/render.js';
import {
  sortEventsDefault,
  sortEventsByPrice,
  sortEventsByTime,
  SortType
} from '../utils/sorting.js';
import { updateItem } from '../utils/common.js';

export default class TripPresenter {
  #container = null;
  #eventModel = null;

  #componentList = new EventListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();

  #eventList = [];
  #eventPresenter = new Map();

  #currentSortType = SortType.DEFAULT;

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

  #sortEvents = (sortType) => {
    switch (sortType) {
      case SortType.DEFAULT:
        this.#eventList.sort(sortEventsDefault);
        break;

      case SortType.TIME:
        this.#eventList.sort(sortEventsByTime);
        break;

      case SortType.PRICE:
        this.#eventList.sort(sortEventsByPrice);
        break;

      default:
        throw new Error('sortType unknown');
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventList();
    this.#renderEvents();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#container);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEvent = (item) => {
    const eventPresenter = new EventPresenter(
      this.#componentList.element,
      this.#handleEventChange,
      this.#handleModeChange
    );
    eventPresenter.init(item);
    this.#eventPresenter.set(item.id, eventPresenter);
  };

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderTrip = () => {
    if (!this.#eventList.length) {
      render(this.#noEventComponent, this.#container);
      return;
    }

    this.#renderSort();
    render(this.#componentList, this.#container);
    this.#eventList.sort(sortEventsDefault);
    this.#renderEvents();
  };

  #renderEvents = () => {
    this.#eventList.forEach(this.#renderEvent);
  };
}
