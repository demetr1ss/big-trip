import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import NoEventView from '../view/no-event-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { render, RenderPosition } from '../render.js';
import { isEscapeKey } from '../util.js';

const tripMainContainer = document.querySelector('.trip-main');
export default class TripPresenter {
  #container = null;
  #eventModel = null;

  #componentList = new EventListView();

  #eventList = [];

  constructor(container, eventModel) {
    this.#container = container;
    this.#eventModel = eventModel;
  }

  init = () => {
    this.#eventList = [...this.#eventModel.points];
    this.#renderEvents();
  };

  #renderEvent = (item) => {
    const eventComponent = new EventView(item);
    const formEditComponent = new FormEditView(item);

    const replaceEventToForm = () => {
      this.#componentList.element.replaceChild(formEditComponent.element, eventComponent.element);
    };

    const replaceFormToEvent = () => {
      this.#componentList.element.replaceChild(eventComponent.element, formEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#componentList.element);
  };

  #renderEvents = () => {
    if (!this.#eventList.length) {
      render(new NoEventView(), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#componentList, this.#container);
    Array.from(this.#eventList, (item) => this.#renderEvent(item));
    render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
  };
}
