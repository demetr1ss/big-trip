import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { START_DATES, END_DATES } from './mock-data.js';
import { ALL_OFFERS } from './offers.js';
import { customAlphabet } from 'nanoid';
import { DESTINATIONS } from './destinations.js';
import { OFFER_TYPES } from '../utils/const.js';

const nanoid = customAlphabet('1234567890', 10);

export const getEventOffers = (type) => ALL_OFFERS.find((offer) => offer.type === type);
export const allCityes = () => DESTINATIONS.map((city) => city.name);

export const generateTripEvent = () => {
  const type = getRandomArrayElement(OFFER_TYPES);

  return ({
    basePrice: getRandomInteger(200, 1000),
    dateFrom: getRandomArrayElement(START_DATES),
    dateTo: getRandomArrayElement(END_DATES),
    destination: getRandomArrayElement(DESTINATIONS),
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger()),
    offers: [1, 2, 3],
    type,
  });
};
