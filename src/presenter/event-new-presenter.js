import { render, remove, RenderPosition } from '../framework/render.js';
import FormCreateView from '../view/form-create-view.js';
import { isEscapeKey } from '../utils/common.js';
import { UserAction, UpdateType } from '../utils/const';

export default class EventNewPresenter {
  #eventListContainer = null;
  #changeData = null;
  #formCreateComponent = null;
  #destroyCallback = null;
  #destinations = null;
  #offers = null;

  constructor(eventListContainer, changeData) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
  }

  init = (callback, destinations, offers) => {
    this.#destroyCallback = callback;

    if (this.#formCreateComponent !== null) {
      return;
    }

    this.#destinations = destinations;
    this.#offers = offers;

    this.#formCreateComponent = new FormCreateView(this.#destinations, this.#offers);
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

  setAborting = () => {
    const resetFormState = () => {
      this.#formCreateComponent.updateElement({
        isDisabled: false,
        isSaving: false,
      });
    };

    this.#formCreateComponent.shake(resetFormState);
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
