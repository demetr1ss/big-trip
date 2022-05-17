import dayjs from 'dayjs';

export const sortEventsDefault = (pointA, pointB) =>
  dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));

export const sortEventsByTime = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationPointB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  if (durationPointB - durationPointA === 0) {
    return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
  }

  return durationPointB - durationPointA;
};

export const sortEventsByPrice = (pointA, pointB) => {
  if (pointB.basePrice - pointA.basePrice === 0) {
    return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
  }

  return pointB.basePrice - pointA.basePrice;
};
