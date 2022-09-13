import { ApolloError, useMutation, useQuery } from '@apollo/client';

import { FindPinnedReviewsResponse } from '../../../../../../../../graphql/Review/types';

import { FIND_PINNED_REVIEWS } from '../../../../../../../../graphql/Review';

import { PIN_REVIEW } from '../../../../../../../../graphql/Profile';

import {
  PinReviewInput,
  PinReviewResponse,
} from '../../../../../../../../graphql/Profile/types';

import { useAuth } from '../../../../../../../../hooks/useAuth';

interface EditModalLogicHandles {
  cachedPinnedReviews: FindPinnedReviewsResponse;

  error: ApolloError;

  handleUnpin: (movieId: number) => Promise<void>;
}

export const useLogic = (): EditModalLogicHandles => {
  const { user } = useAuth();

  const { data: cachedPinnedReviews } = useQuery(FIND_PINNED_REVIEWS, {
    variables: { userId: user.id },
    fetchPolicy: 'cache-first',
  });

  const [pinReview, { loading, error }] = useMutation<
    PinReviewResponse,
    PinReviewInput
  >(PIN_REVIEW, {
    errorPolicy: 'all',
    update: (cache, { data }, context) => {
      if (!data || data.pinReview.pinned) return;

      cache.updateQuery<FindPinnedReviewsResponse>(
        {
          query: FIND_PINNED_REVIEWS,
        },
        cacheData => ({
          pinnedReviews: (cacheData?.pinnedReviews || []).filter(
            pinnedReview => pinnedReview.id !== context.variables.reviewId,
          ),
        }),
      );
    },
  });

  const handleUnpin = async (movieId: number) => {
    if (loading) return;

    if (!cachedPinnedReviews) return;

    const review = cachedPinnedReviews.pinnedReviews.find(
      review => review.movie.id === movieId,
    );

    if (!review) return;

    await pinReview({ variables: { reviewId: review.id } });
  };

  return {
    cachedPinnedReviews,

    error,

    handleUnpin,
  };
};
