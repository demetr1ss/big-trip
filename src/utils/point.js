export const getAllCities = (destinations) =>
  destinations.map((city) => city.name);

export const getEventOffers = (offers, pointType) =>
  offers.find((offer) => offer.type === pointType);

export const getOffersCost = (allOffers, selectedOffers, type) => {
  const availableOffers = getEventOffers(allOffers, type).offers || [];

  return availableOffers.reduce((sum, offer) => {
    if (selectedOffers.includes(offer.id)) {
      sum += offer.price;
    }

    return sum;
  }, 0);
};
