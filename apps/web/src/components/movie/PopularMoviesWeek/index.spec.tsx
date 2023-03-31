import { MockedProvider } from '@apollo/client/testing';

import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';

import { faker } from '@faker-js/faker';

import type {
  FindTrendingMoviesQuery,
  FindTrendingMoviesQueryVariables,
} from '@/graphql';

import { FindTrendingMoviesDocument } from '@/graphql';

import { mockApolloRequest, mockMovie } from '@/tests/data/mocks';

import { PopularMoviesWeek } from '.';

function createSut(moviesAmount: number): RenderResult {
  const mockPopularMovies = mockApolloRequest<
    FindTrendingMoviesQuery,
    FindTrendingMoviesQueryVariables
  >({
    request: {
      query: FindTrendingMoviesDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        trendingMovies: {
          pageInfo: {
            currentPage: 1,
            hasNextPage: false,
            hasPreviousPage: false,
          },
          totalPages: 1,
          edges: Array.from({
            length: moviesAmount,
          }).map(() => ({ node: mockMovie() })),
        },
      },
    },
  });

  const sut = render(
    <MockedProvider addTypename={false} mocks={[mockPopularMovies]}>
      <PopularMoviesWeek />
    </MockedProvider>,
  );

  return sut;
}

describe('PopularMoviesWeek', () => {
  afterEach(cleanup);

  test('Should render a list of MovieCover when data is present', async () => {
    const moviesAmount = faker.datatype.number({ min: 1, max: 6 });

    const sut = createSut(moviesAmount);

    const popularMoviesList = await waitFor(() =>
      sut.getByTestId('popularMoviesWeek'),
    );

    expect(popularMoviesList).toBeInTheDocument();
    expect(popularMoviesList.childElementCount).toBe(moviesAmount);
  });

  test('Should show text for empty list when PopularMoviesWeek is empty', () => {
    const sut = createSut(0);

    const emptyTextElement = sut.container.querySelector('h2');
    expect(emptyTextElement).toBeInTheDocument();
  });
});
