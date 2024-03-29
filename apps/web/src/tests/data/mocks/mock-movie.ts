import { faker } from '@faker-js/faker';

import { Movie, MovieGenre } from '@/gql';

function mockMovieGenre(): MovieGenre {
  return {
    id: faker.datatype.number(),
    name: faker.music.genre(),
  };
}

export function mockMovieGenres(amount: number): MovieGenre[] {
  return Array.from({
    length: amount,
  }).map(() => mockMovieGenre());
}

export const mockMovie = (): Movie => ({
  id: faker.datatype.number(),
  genres: mockMovieGenres(faker.datatype.number({ min: 1, max: 10 })),
  productionCompanies: [],
  spokenLanguages: [],
  runtime: faker.datatype.number({ min: 30, max: 240 }),
  voteAverage: faker.datatype.number({ min: 1, max: 10 }),
  releaseDate: faker.date.past().toISOString(),
  imdbId: faker.datatype.uuid(),
  originalLanguage: 'en_US',
  originalTitle: faker.random.words(),
  overview: faker.lorem.lines(5),
  posterUrl: faker.internet.avatar(),
  backdropUrl: faker.internet.avatar(),
});
