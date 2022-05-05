import FormEditView from '../view/form-edit-view.js';
import EventView from '../view/event-view.js';
import SortView from '../view/sort-view.js';
import EventListView from '../view/event-list-view.js';
import {render} from '../render.js';

export default class TripPresenter {
  componentList = new EventListView();

  init = (container, eventModel) => {
    this.container = container;
    this.eventModel = eventModel;
    this.eventList = [...eventModel.getPoints()];

    render(new SortView(), this.container);
    render(this.componentList, this.container);
    render(new FormEditView(this.eventList[0]), this.componentList.getElement());

    Array.from(this.eventList, (item) => render(new EventView(item), this.componentList.getElement()));
  };
}
