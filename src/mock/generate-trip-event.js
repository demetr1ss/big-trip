import { ALL_OFFERS } from './offers.js';
import { DESTINATIONS } from './destinations.js';

export const getEventOffers = (type) => ALL_OFFERS.find((offer) => offer.type === type);
export const allCityes = () => DESTINATIONS.map((city) => city.name);
