import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/event-model.js';
import { render, RenderPosition } from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel);

render(new FilterView(), filtersContainer);
render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);

tripPresenter.init();
