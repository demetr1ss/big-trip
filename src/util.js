import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatDate = (date, format) => dayjs(date).format(format);

export const humanizeTime = (date) => dayjs(date).format('HH:mm');

export const getDurationTime = (dateFrom, dateTo) => {
  dateTo = dayjs(dateTo).format('YYYY-MM-DDTHH:mm');
  let minutes = dayjs(dateTo).diff(dateFrom, 'minutes', true);
  const hours = Math.floor(minutes / 60);
  minutes = Math.ceil(minutes - (hours * 60));

  return `${hours}H ${minutes}M`;

};

