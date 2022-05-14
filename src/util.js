import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export const formatDate = (date, format) => dayjs(date).format(format);

export const getDurationTime = (dateFrom, dateTo) => {
  const endDate = dayjs(dateTo);
  const startDate = dayjs(dateFrom);
  const timeDuration = dayjs.duration(endDate.diff(startDate));

  if (timeDuration.days() > 0) {
    return timeDuration.format('DD[D] HH[H] mm[M]');
  }

  if (timeDuration.hours() > 0) {
    return timeDuration.format('HH[H] mm[M]');
  }

  return timeDuration.format('mm[M]');
};

export const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
