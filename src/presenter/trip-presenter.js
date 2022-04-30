import FormEditView from '../view/form-edit-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  listComponent = new ListView();

  init = (container) => {
    this.container = container;

    render(new SortView(), this.container);
    render(this.listComponent, this.container);
    render(new FormEditView(), this.listComponent.getElement());

    Array.from({length:3}, () => render(new RoutePointView(), this.listComponent.getElement()));
  };
}
