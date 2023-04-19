import { RenderResult, fireEvent, render } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import { MockedRouterProvider, mockedRouter } from '@/tests/data/mocks';

import { MovieGenre } from '.';

type SutType = {
  sut: RenderResult;
  genre: string;
};

function createSut(): SutType {
  const genre = faker.music.genre();

  const sut = render(
    <MockedRouterProvider>
      <MovieGenre name={genre} />
    </MockedRouterProvider>,
  );

  return {
    sut,
    genre,
  };
}

describe('MovieGenre', () => {
  test('Should navigate to the correct URL when clicking movie genre', () => {
    const { sut, genre } = createSut();

    const buildFilteredHrefMock = jest.fn(() => ({
      href: {
        pathname: '/movies/genre/[genre]',
        query: {
          genre,
        },
      },
    }));

    jest.mock('@/hooks/useSortLinkBuilder', () => ({
      useSortLinkBuilder: () => ({
        buildFilteredHref: buildFilteredHrefMock,
      }),
    }));

    const genreLink = sut.getByTestId('movie-genre-link');
    fireEvent.click(genreLink);

    expect(mockedRouter.asPath).toEqual(`/movies/genre/${genre.toLowerCase()}`);
  });
});
