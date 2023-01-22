import { MockedProvider } from '@apollo/client/testing';

import { screen, render } from '@testing-library/react';

import type {
  FindPopularReviewsFromMovieQuery,
  FindPopularReviewsFromMovieQueryVariables,
} from '../../../../../graphql';

import { FindPopularReviewsFromMovieDocument } from '../../../../../graphql';

import PopularReviews from '.';

const mockPopularReviewsData = {
  request: {
    query: FindPopularReviewsFromMovieDocument,
    variables: { movieId: 1 } as FindPopularReviewsFromMovieQueryVariables,
  },
  result: {
    data: {} as FindPopularReviewsFromMovieQuery,
  },
};

const mockPopularReviewsError = {
  request: {
    query: FindPopularReviewsFromMovieDocument,
    variables: { movieId: 1 } as FindPopularReviewsFromMovieQueryVariables,
  },
  error: new Error('Error loading'),
};

describe('MoviePopularReviews', () => {
  it('should render with one review', async () => {
    render(
      <MockedProvider addTypename={false} mocks={[mockPopularReviewsData]}>
        <PopularReviews movieId={1} />
      </MockedProvider>,
    );

    // expect(await screen.findByTestId('loading-state')).toBeInTheDocument();

    expect(await screen.findByRole('list')).toBeInTheDocument();

    const listItem = await screen.findAllByRole('listitem');

    expect(listItem.length).toBe(1);
  });

  it('should render error on load review', async () => {
    render(
      <MockedProvider addTypename={false} mocks={[mockPopularReviewsError]}>
        <PopularReviews movieId={1} />
      </MockedProvider>,
    );

    expect(await screen.findByTestId('loading-error')).toBeInTheDocument();
  });
});
