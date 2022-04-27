import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import {render} from './render.js';

const tripMainContainer = document.querySelector('.trip-main');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pageMainContainer = document.querySelector('.page-main');
const tripEventsContainer = pageMainContainer.querySelector('.trip-events');
const tripPresenter = new TripPresenter();

render(new FilterView(), filtersContainer);

tripPresenter.init(tripEventsContainer);
