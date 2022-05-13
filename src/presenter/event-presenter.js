
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../util.js';
import FormEditView from '../view/form-edit-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter {
  #eventComponent = null;
  #formEditComponent = null;
  #eventListContainer = null;

  constructor(eventListContainer) {
    this.#eventListContainer = eventListContainer;
  }

  init = (item) => {
    this.#eventComponent = new EventView(item);
    this.#formEditComponent = new FormEditView(item);

    this.#eventComponent.setEditClickHandler(this.#handleEditClick);
    this.#formEditComponent.setEditClickHandler(this.#handleRollUpClick);
    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#eventComponent, this.#eventListContainer);
  };

  #replaceEventToForm = () => {
    replace(this.#formEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleRollUpClick = () => {
    this.#replaceFormToEvent();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToEvent();
  };

  #handleDeleteClick= () => {
    this.#replaceFormToEvent();
  };

}
