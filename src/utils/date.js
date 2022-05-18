import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

export const isDateExpired = (dueDate) =>
  dueDate && dayjs().isAfter(dueDate, 'D');

export const isToday = (dueDate) => dayjs().isSame(dueDate, 'D');
