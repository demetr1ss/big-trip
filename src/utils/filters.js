import { isDateExpired, isToday } from './date.js';
import { FilterType } from './const.js';

export const filter = {
  [FilterType.EVERYTHING]: (eventList) => eventList,

  [FilterType.FUTURE]: (eventList) => eventList.filter(
    (point) => !isDateExpired(point.dateFrom) || isToday(point.dateFrom)),

  [FilterType.PAST]: (eventList) => eventList.filter(
    (point) => isDateExpired(point.dateTo)),
};
