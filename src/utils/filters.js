import { isDateExpired, isToday } from './date.js';
import { FilterType } from './const.js';

export const filter = {
  [FilterType.EVERYTHING]: (eventList) => eventList,

  [FilterType.FUTURE]: (eventList) => eventList.filter(
    (event) =>
      !isDateExpired(event.dateFrom) ||
      isToday(event.dateFrom) ||
      (isDateExpired(event.dateFrom) && !isDateExpired(event.dateTo))
  ),

  [FilterType.PAST]: (eventList) => eventList.filter(
    (event) =>
      isDateExpired(event.dateTo) ||
      (isDateExpired(event.dateFrom) && !isDateExpired(event.dateTo))
  ),
};
