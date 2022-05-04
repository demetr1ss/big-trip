import { getRandomInteger } from '../util.js';
import { OFFER_TYPES, allOffers, CITIES, DESCRIPTIONS, START_DATES, END_DATES } from './mock-data.js';

export const generateTripEvent = () => {
  const type = OFFER_TYPES[getRandomInteger(0, OFFER_TYPES.length-1)];
  const eventOffers = allOffers.find((offer) => offer.type === type);

  return ({
    basePrice: getRandomInteger(200, 1000),
    dateFrom: START_DATES[getRandomInteger(0, START_DATES.length - 1)],
    dateTo: END_DATES[getRandomInteger(0, END_DATES.length - 1)],
    destination: {
      description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length-1)],
      name: CITIES[getRandomInteger(0, CITIES.length-1)],
      pictures: [
        {
          src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
          description: 'description'
        }
      ]
    },
    id: getRandomInteger(0, 1000),
    isFavorite: Boolean(getRandomInteger()),
    offers: eventOffers ? eventOffers.offers : [],
    type,
  });
};
