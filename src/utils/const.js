export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

export const FilterType = {
  EVERYTHING : 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const OFFER_TYPES = [
  'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'
];
