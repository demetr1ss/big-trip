/* eslint-disable no-console */
import EventPresenter from './event-presenter.js';
import EventNewPresenter from './event-new-presenter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import LoadingView from '../view/loading-view.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { sortEventsDefault, sortEventsByPrice, sortEventsByTime } from '../utils/sorting.js';
import { SortType, UpdateType, UserAction, FilterType } from '../utils/const.js';
import { filter } from '../utils/filters.js';

export default class TripPresenter {
  #container = null;
  #eventModel = null;
  #filterModel = null;

  #componentList = new EventListView();
  #loadingComponent = new LoadingView();
  #eventPresenter = new Map();
  #sortComponent = null;
  #noEventComponent = null;
  #eventNewPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor(container, eventModel, filterModel) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    console.log('offers', this.#eventModel.offers);
    console.log('destinations', this.#eventModel.destinations);

    this.#eventNewPresenter = new EventNewPresenter(this.#componentList.element,
      this.#handleViewAction);

    this.#eventModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[this.#filterType](events);

    switch(this.#currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(sortEventsDefault);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
      case SortType.TIME:
        return filteredEvents.sort(sortEventsByTime);
    }

    return filteredEvents;
  }

  get offers() {
    return this.#eventModel.offers;
  }

  get destinations() {
    return this.#eventModel.destinations;
  }

  init = () => {
    this.#renderTrip();
  };

  createEvent = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#eventNewPresenter.init(callback);
  };

  #handleModeChange = () => {
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenter.get(update.id).setSaving();
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventNewPresenter.setSaving();
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenter.get(update.id).setDeleting();
        this.#eventModel.deleteEvent(updateType, update);
        break;
      default:
        throw new Error(`actionType: ${actionType} not exist`);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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

  #renderLoading = () => {
    render(this.#loadingComponent, this.#componentList.element, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
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
    this.#eventNewPresenter.destroy();
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if(this.#noEventComponent){
      remove(this.#noEventComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderTrip = () => {
    render(this.#componentList, this.#container);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.events.length) {
      this.#noEventComponent = new NoEventView(this.#filterType);
      render(this.#noEventComponent, this.#container);
      return;
    }

    this.#renderSort();
    this.events.forEach(this.#renderEvent);
    this.events.sort(sortEventsDefault);
  };
}
