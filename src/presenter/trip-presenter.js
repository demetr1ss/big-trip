import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import { remove, render } from '../framework/render.js';
import { sortEventsDefault, sortEventsByPrice, sortEventsByTime } from '../utils/sorting.js';
import { SortType, UpdateType, UserAction, FilterType } from '../utils/const.js';
import { filter } from '../utils/filters.js';

export default class TripPresenter {
  #container = null;
  #eventModel = null;
  #filterModel = null;

  #componentList = new EventListView();
  #sortComponent = null;
  #noEventComponent = null;
  #eventPresenter = new Map();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor(container, eventModel, filterModel) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#eventModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch(this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredPoints.sort(sortEventsDefault);
      case SortType.PRICE:
        return filteredPoints.sort(sortEventsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortEventsByTime);
    }

    return filteredPoints;
  }

  init = () => {
    this.#renderTrip();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
      default:
        throw new Error('actionType not exist');
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEvents();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearEvents({resetSortType: true});
        this.#renderTrip();
        break;
      default:
        throw new Error('updateType not exist');
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearEvents();
    this.#renderTrip();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#container);
  };

  #renderEvent = (item) => {
    const eventPresenter = new EventPresenter(
      this.#componentList.element,
      this.#handleViewAction,
      this.#handleModeChange
    );
    eventPresenter.init(item);
    this.#eventPresenter.set(item.id, eventPresenter);
  };

  #clearEvents = ({resetSortType = false} = {}) => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);

    if(this.#noEventComponent){
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderTrip = () => {
    if (!this.events.length) {
      this.#noEventComponent = new NoEventView(this.#filterType);
      render(this.#noEventComponent, this.#container);
      return;
    }

    this.#renderSort();
    render(this.#componentList, this.#container);
    this.events.forEach(this.#renderEvent);
    this.events.sort(sortEventsDefault);
  };
}
