import { cleanup, render, RenderResult } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { mockMovie } from '@/tests/data/mocks';

import { PopularMoviesList } from '.';

type SutType = {
  sut: RenderResult;
  moviesCount: number;
};

function createSut(
  moviesCount = faker.datatype.number({ min: 1, max: 6 }),
): SutType {
  const sut = render(
    <PopularMoviesList
      movies={Array.from({ length: moviesCount }).map(() => mockMovie())}
    />,
  );

  return {
    sut,
    moviesCount,
  };
}

describe('PopularMoviesList', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should render a list of MovieCover when data is present', async () => {
    const { sut, moviesCount } = createSut();

    const popularMoviesList = sut.getByTestId('popular-movies-list');

    expect(popularMoviesList).toBeInTheDocument();
    expect(popularMoviesList.childElementCount).toBe(moviesCount);
  });
  test('Should show text for empty list when PopularMoviesWeek is empty', () => {
    const { sut } = createSut(0);

    const emptyTextElement = sut.getByTestId('empty-list-text');
    expect(emptyTextElement).toBeInTheDocument();
  });
});
