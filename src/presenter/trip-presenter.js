import FormEditView from '../view/form-edit-view.js';
import RoutePointView from '../view/route-point-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  init = (container) => {
    this.container = container;

    render(new SortView(), this.container);
    render(new FormEditView(), this.container);

    Array.from({length:3}, () => render(new RoutePointView(), this.container));
  };
}
