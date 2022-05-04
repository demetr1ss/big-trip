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
  let hours = Math.floor(minutes / 60);
  minutes = Math.ceil(minutes - (hours * 60));

  if (minutes === 60) {
    hours++;
    minutes = 0;
  }

  if (`${minutes}`.length < 2) {
    minutes = `0${minutes}`;
  }

  if (`${hours}`.length < 2) {
    hours = `0${hours}`;
  }

  if (hours >= 24) {
    let days = Math.floor(hours / 24);
    hours = hours - (days * 24);

    if (`${days}`.length < 2) {
      days = `0${days}`;
    }

    return `${days}D ${hours}H ${minutes}M`;
  }

  return `${hours}H ${minutes}M`;
};

