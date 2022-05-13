import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { OFFER_TYPES, ALL_OFFERS, CITIES, DESCRIPTIONS, START_DATES, END_DATES } from './mock-data.js';
import { nanoid } from 'nanoid';

export const generateTripEvent = () => {
  const type = getRandomArrayElement(OFFER_TYPES);
  const eventOffers = ALL_OFFERS.find((offer) => offer.type === type);

  return ({
    basePrice: getRandomInteger(200, 1000),
    dateFrom: getRandomArrayElement(START_DATES),
    dateTo: getRandomArrayElement(END_DATES),
    destination: {
      description: getRandomArrayElement(DESCRIPTIONS),
      name: getRandomArrayElement(CITIES),
      pictures: [
        {
          src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
          description: 'description'
        }
      ]
    },
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger()),
    offers: eventOffers?.offers || [],
    type,
  });
};
