import { isDateExpired, isToday } from '../util.js';

const FilterType = {
  EVERYTHING : 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const filter = {
  [FilterType.EVERYTHING]: (eventList) => eventList,

  [FilterType.FUTURE]: (eventList) => eventList.filter(
    (point) => !isDateExpired(point.dateFrom) || isToday(point.dateFrom)),

  [FilterType.PAST]: (eventList) => eventList.filter(
    (point) => isDateExpired(point.dateTo)),
};

export const generateFilter = (eventList) => Object.entries(filter).map(
  ([filterName, filterEvents]) => ({
    name: filterName,
    count: filterEvents(eventList).length,
  }),
);