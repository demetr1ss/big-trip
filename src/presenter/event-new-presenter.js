import { render, remove, RenderPosition } from '../framework/render.js';
import FormCreateView from '../view/form-create-view.js';
import { isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType } from '../utils/const';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #formCreateComponent = null;
  #destroyCallback = null;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#formCreateComponent !== null) {
      return;
    }

    this.#formCreateComponent = new FormCreateView();
    this.#formCreateComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#formCreateComponent.setCancelClickHandler(this.#handleDeleteClick);

    render(this.#formCreateComponent, this.#eventListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  destroy = () => {
    if (this.#formCreateComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#formCreateComponent);
    this.#formCreateComponent = null;

    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  setSaving = () => {
    this.#formCreateComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (event) => {
    this.#changeData(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      event,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
