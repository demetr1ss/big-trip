import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import FormEditView from '../view/form-edit-view.js';
import NoEventView from '../view/no-event-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../util.js';
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
    this.#renderTrip();
  };

  #renderEvent = (item) => {
    const eventComponent = new EventView(item);
    const formEditComponent = new FormEditView(item);

    const replaceEventToForm = () => {
      replace(formEditComponent, eventComponent);
    };

    const replaceFormToEvent = () => {
      replace(eventComponent, formEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    eventComponent.setEditClickHandler(() => {
      replaceEventToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.setEditClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.setFormSubmitHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    formEditComponent.setDeleteClickHandler(() => {
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(eventComponent, this.#componentList.element);
  };

  #renderTrip = () => {
    if (!this.#eventList.length) {
      render(new NoEventView(), this.#container);
      return;
    }

    render(new SortView(), this.#container);
    render(this.#componentList, this.#container);

    this.#eventList.forEach(this.#renderEvent);
  };
}
