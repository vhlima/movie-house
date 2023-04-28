import { MockedProvider } from '@apollo/client/testing';

import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react';

import { faker } from '@faker-js/faker';

import type {
  FindTrendingMoviesQuery,
  FindTrendingMoviesQueryVariables,
} from '@/gql';

import { FindTrendingMoviesDocument } from '@/gql';

import {
  mockApolloRequest,
  mockedRouter,
  MockedRouterProvider,
  mockMovie,
} from '@/tests/data/mocks';

import { PopularMoviesWeek } from '.';

type SutType = {
  sut: RenderResult;
  moviesCount: number;
};

function createSut(): SutType {
  const moviesCount = faker.datatype.number({ min: 1, max: 6 });

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
            length: moviesCount,
          }).map(() => ({ node: mockMovie() })),
        },
      },
    },
  });

  const sut = render(
    <MockedProvider addTypename={false} mocks={[mockPopularMovies]}>
      <MockedRouterProvider>
        <PopularMoviesWeek />
      </MockedRouterProvider>
    </MockedProvider>,
  );

  return {
    sut,
    moviesCount,
  };
}

describe('PopularMoviesWeek', () => {
  afterEach(cleanup);
  test('Should render without errors', () => {
    const { sut } = createSut();
    expect(sut.container.firstChild).toBeInTheDocument();
  });
  test('Should navigate to the correct URL when clicking card header', () => {
    const { sut } = createSut();

    const linkElement = sut.getByTestId('trending-movies-link');
    fireEvent.click(linkElement);

    expect(mockedRouter.asPath).toEqual('/movies/trending');
  });
});
