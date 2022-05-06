import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/event-model.js';
import { render } from './render.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel);

render(new FilterView(), filtersContainer);

tripPresenter.init();
