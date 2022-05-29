/* eslint-disable no-console */
import EventPresenter from './event-presenter.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import NoEventView from '../view/no-event-view.js';
import { render } from '../framework/render.js';
import { sortEventsDefault, sortEventsByPrice, sortEventsByTime } from '../utils/sorting.js';
import { SortType } from '../utils/const.js';

export default class TripPresenter {
  #container = null;
  #eventModel = null;

  #componentList = new EventListView();
  #sortComponent = new SortView();
  #noEventComponent = new NoEventView();
  #eventPresenter = new Map();

  #currentSortType = SortType.DEFAULT;

  constructor(container, eventModel) {
    this.#container = container;
    this.#eventModel = eventModel;
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    switch(this.#currentSortType) {
      case SortType.DEFAULT:
        return [...this.#eventModel.points].sort(sortEventsDefault);
      case SortType.PRICE:
        return [...this.#eventModel.points].sort(sortEventsByPrice);
      case SortType.TIME:
        return [...this.#eventModel.points].sort(sortEventsByTime);
    }

    return this.#eventModel.points;
  }

  init = () => {
    this.#renderTrip();
  };

  #handleModeChange = () => {
    this.#eventPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда удалили точку)
    // - обновить всю доску (например, при переключении фильтра)
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
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
      this.#handleViewAction,
      this.#handleModeChange
    );
    eventPresenter.init(item);
    this.#eventPresenter.set(item.id, eventPresenter);
  };

  #renderEvents = () => {
    this.events.forEach(this.#renderEvent);
  };

  #clearEventList = () => {
    this.#eventPresenter.forEach((presenter) => presenter.destroy());
    this.#eventPresenter.clear();
  };

  #renderTrip = () => {
    if (!this.events.length) {
      render(this.#noEventComponent, this.#container);
      return;
    }

    this.#renderSort();
    render(this.#componentList, this.#container);
    this.events.sort(sortEventsDefault);
    this.#renderEvents();
  };
}
