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

const setTimeFormat = (item) => String(item).padStart(2, '0');

export const getDurationTime = (dateFrom, dateTo) => {
  const endDate = dayjs(dateTo);
  const startDate = dayjs(dateFrom);
  const timeDuration = dayjs.duration(endDate.diff(startDate));
  let {days, hours, minutes} = timeDuration.$d;
  days = setTimeFormat(days);
  hours = setTimeFormat(hours);
  minutes = setTimeFormat(minutes);

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
};
