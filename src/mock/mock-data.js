export const OFFER_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

export const allOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      },
      {
        id: 3,
        title: 'Order Uber',
        price: 20
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: 50
      },
      {
        id: 2,
        title: 'Switch to comfort',
        price: 100
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: 50,
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 40
      },
      {
        id: 2,
        title: 'Lunch in city',
        price: 30
      }
    ]
  }
];

export const CITIES = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Moscow'];

export const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];

export const START_DATES = ['2019-07-10T05:15:35.845Z', '2019-07-07T12:33:12.845Z', '2019-07-12T23:02:13.845Z', '2019-07-13T13:15:44.845Z', '2019-07-09T19:00:33.845Z'];

export const END_DATES = ['2019-07-14T19:55:55.845Z', '2019-07-14T12:03:13.845Z', '2019-07-15T16:17:22.845Z', '2019-07-14T23:15:55.845Z', '2019-07-15T07:32:55.845Z'];
