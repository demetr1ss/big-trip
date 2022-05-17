import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import EventsModel from './model/event-model.js';
import { generateFilter } from './utils/filters.js';
import { render, RenderPosition } from './framework/render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel);

const filters = generateFilter(eventsModel.points);

render(new FilterView(filters), filtersContainer);
render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);

tripPresenter.init();
