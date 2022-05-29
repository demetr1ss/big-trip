
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';
import FormEditView from '../view/form-edit-view.js';
import EventView from '../view/event-view.js';
import { UserAction, UpdateType } from '../utils/const.js';
import { isDatesEqual } from '../utils/date.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventComponent = null;
  #formEditComponent = null;
  #eventListContainer = null;
  #changeData = null;
  #event = null;
  #changeMode = null;

  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (item) => {
    this.#event = item;

    const prevEventComponent = this.#eventComponent;
    const prevFormEditComponent = this.#formEditComponent;

    this.#eventComponent = new EventView(item);
    this.#formEditComponent = new FormEditView(item);

    this.#eventComponent.setEditClickHandler(this.#handleEditClick);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formEditComponent.setEditClickHandler(this.#handleRollUpClick);
    this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevEventComponent === null || prevFormEditComponent === null) {
      render(this.#eventComponent, this.#eventListContainer);
      return;
    }

    switch (this.#mode) {
      case Mode.DEFAULT:
        replace(this.#eventComponent, prevEventComponent);
        break;
      case Mode.EDITING:
        replace(this.#formEditComponent, prevFormEditComponent);
        break;
      default:
        throw new Error(`${this.#mode} unknown`);
    }

    remove(prevEventComponent);
    remove(prevFormEditComponent);
  };

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#formEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  };

  #replaceEventToForm = () => {
    replace(this.#formEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#eventComponent, this.#formEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#formEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleRollUpClick = () => {
    this.#formEditComponent.reset(this.#event);
    this.#replaceFormToEvent();
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#event.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#event.dateTo, update.dateTo);

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToEvent();
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      point,
    );
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event, isFavorite: !this.#event.isFavorite}
    );
  };

}
