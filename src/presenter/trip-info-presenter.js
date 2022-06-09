import {render, replace, remove, RenderPosition} from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #tripInfoContainer = null;
  #eventModel = null;
  #tripInfoComponent = null;
  #prevTripInfoComponent = null;
  #tripPresenter = null;

  constructor(tripInfoContainer, tripPresenter, eventModel) {
    this.#tripInfoContainer = tripInfoContainer;
    this.#eventModel = eventModel;
    this.#tripPresenter = tripPresenter;

    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#prevTripInfoComponent = this.#tripInfoComponent;

    this.#tripInfoComponent = new TripInfoView(this.#tripPresenter.events, this.#eventModel.offers);

    if (this.#prevTripInfoComponent === null && this.#eventModel.events !== 0) {
      render(this.#tripInfoComponent, this.#tripInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, this.#prevTripInfoComponent);
    remove(this.#prevTripInfoComponent);
  };

  destroy = () => {
    remove(this.#tripInfoComponent);
  };

  #handleModelEvent = () => {
    if (this.#eventModel.events.length === 0) {
      remove(this.#tripInfoComponent);
      this.#prevTripInfoComponent = null;
      this.#tripInfoComponent = null;
      return;
    }
    this.init();
  };
}
