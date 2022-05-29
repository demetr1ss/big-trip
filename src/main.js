import TripInfoView from './view/trip-info-view.js';
import FilterModel from './model/filter-model.js';
import EventsModel from './model/event-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripPresenter from './presenter/trip-presenter.js';
import { render, RenderPosition } from './framework/render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const tripEventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripEventsContainer, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersContainer, filterModel, eventsModel);

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init();
