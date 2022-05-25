import { getRandomInteger } from '../utils/common.js';

export const DESTINATIONS = [
  {
    description: 'Amsterdam Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Amsterdam'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Amsterdam'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Amsterdam'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Amsterdam'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Amsterdam'
      }
    ]
  },
  {
    description: '',
    name: 'Chamonix',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Chamonix'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Chamonix'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Chamonix'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Chamonix'
      },
    ]
  },
  {
    description: 'Geneva Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    name: 'Geneva',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Geneva'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Geneva'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Geneva'
      },
    ]
  },
  {
    description: 'Paris Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    name: 'Paris',
    pictures: [
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Paris'
      },
      {
        src: `http://picsum.photos/300/200?r=${getRandomInteger(0, 10000)}`,
        description: 'Paris'
      },
    ]
  },
  {
    description: '',
    name: 'Moscow',
    pictures: []
  }
];
