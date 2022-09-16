import { ApolloError } from '@apollo/client';

import type { FindUserPinnedReviewsQuery } from '../../../../../../../../graphql';

import {
  FindUserPinnedReviewsDocument,
  usePinReviewMutation,
  useFindUserPinnedReviewsQuery,
} from '../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../hooks/useAuth';

interface EditModalLogicHandles {
  cachedPinnedReviews: FindUserPinnedReviewsQuery;

  error: ApolloError;

  handleUnpin: (movieId: number) => Promise<void>;
}

export const useLogic = (): EditModalLogicHandles => {
  const { user } = useAuth();

  const { data: cachedPinnedReviews } = useFindUserPinnedReviewsQuery({
    variables: { userId: user.id },
    fetchPolicy: 'cache-first',
  });

  const [pinReview, { loading, error }] = usePinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }, context) => {
      if (!data || data.pinReview.pinned) return;

      cache.updateQuery<FindUserPinnedReviewsQuery>(
        {
          query: FindUserPinnedReviewsDocument,
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
