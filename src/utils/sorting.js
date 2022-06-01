import dayjs from 'dayjs';

export const sortEventsDefault = (eventtA, eventB) =>
  dayjs(eventtA.dateFrom).diff(dayjs(eventB.dateFrom));

export const sortEventsByTime = (eventA, eventB) => {
  const durationPointA = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
  const durationPointB = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));

  if (durationPointB - durationPointA === 0) {
    return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
  }

  return durationPointB - durationPointA;
};

export const sortEventsByPrice = (eventA, eventB) => {
  if (eventB.basePrice - eventA.basePrice === 0) {
    return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
  }

  return eventB.basePrice - eventA.basePrice;
};
