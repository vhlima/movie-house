import { MockedProvider } from '@apollo/client/testing';

import { screen, render } from '@testing-library/react';

import type {
  FindMoviePopularReviewsQuery,
  FindMoviePopularReviewsQueryVariables,
} from '../../../../../../graphql';

import { FindMoviePopularReviewsDocument } from '../../../../../../graphql';

import PopularReviews from '.';

const mockPopularReviewsData = {
  request: {
    query: FindMoviePopularReviewsDocument,
    variables: { movieId: 1 } as FindMoviePopularReviewsQueryVariables,
  },
  result: {
    data: {
      moviePopularReviews: [
        {
          id: '1',
          body: 'mock body',
          commentaryCount: 0,
          likes: [],
          author: {
            username: 'mock username',
            profilePictureUrl:
              'https://a.ltrbxd.com/resized/avatar/twitter/4/9/0/4/5/7/shard/http___pbs.twimg.com_profile_images_1001935353740177414_9ZQ0Noe4-0-80-0-80-crop.jpg?k=9c800e12d6',
          },
        },
      ],
    } as FindMoviePopularReviewsQuery,
  },
};

const mockPopularReviewsError = {
  request: {
    query: FindMoviePopularReviewsDocument,
    variables: { movieId: 1 } as FindMoviePopularReviewsQueryVariables,
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
