import { RenderResult, render } from '@testing-library/react';

import { mockMovieGenres } from '@/tests/data/mocks';

import { faker } from '@faker-js/faker';

import { MovieGenres } from '.';

type SutType = {
  sut: RenderResult;
  genres: Array<{
    id: number;
    name: string;
  }>;
};

function createSut(): SutType {
  const genres = mockMovieGenres(faker.datatype.number({ min: 1, max: 10 }));

  const sut = render(<MovieGenres genres={genres} />);

  return {
    sut,
    genres,
  };
}

describe('MovieGenres', () => {
  test('Should render the correct amount of movie genres in the list', () => {
    const { sut, genres } = createSut();

    const genreListElement = sut.getByTestId('movie-genre-list');
    expect(genreListElement.childElementCount).toEqual(genres.length);
  });
});
