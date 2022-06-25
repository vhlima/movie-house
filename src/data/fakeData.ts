import { uuid } from 'uuidv4';

import { MovieProps } from '../hooks/useMovie';

/* eslint-disable import/prefer-default-export */

export const movieList: MovieProps[] = [
  {
    id: uuid(),
    name: 'Doctor Strange',
    rating: 8.1,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/iM1hlVGZ5Qwn3gO6ewTszY7OrLY.jpg',
  },
  {
    id: uuid(),
    name: 'The Simpsons',
    rating: 7.6,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/ARIEA8fMTk8HLy8AyLbKyUjsqC.jpg',
  },
  {
    id: uuid(),
    name: 'Megalodon',
    rating: 6.4,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/hES2eVAbVt08JJTqgu3jmI34Yxx.jpg',
  },
  {
    id: uuid(),
    name: 'Virus Zona de Contenção',
    rating: 4.9,
    coverUrl:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/sOIQ8YlLzOeBXtiXhrZwt7nrdi4.jpg',
  },
];
