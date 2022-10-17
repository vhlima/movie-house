import type { FindUserPinnedReviewsQueryResult } from '../../../../../../../../graphql';

import {
  usePinReviewMutation,
  useFindUserPinnedReviewsQuery,
} from '../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../hooks/useAuth';

import { usePinnedReviewsCache } from './hooks/usePinnedReviewsCache';

interface EditModalLogicHandles {
  pinnedReviewsResult: FindUserPinnedReviewsQueryResult;

  handleUnpin: (movieId: number) => Promise<void>;
}

export const useLogic = (): EditModalLogicHandles => {
  const { user } = useAuth();

  const pinnedReviewsResult = useFindUserPinnedReviewsQuery({
    variables: { userId: user.id },
    fetchPolicy: 'cache-only',
  });

  const { updateCache } = usePinnedReviewsCache();

  const [pinReview, { loading }] = usePinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }, context) => {
      if (!data || data.pinReview.pinned) return;

      updateCache(cacheData => ({
        pinnedReviews: cacheData?.pinnedReviews
          ? cacheData.pinnedReviews.filter(
              pinnedReview => pinnedReview.id !== context.variables.reviewId,
            )
          : [],
      }));
    },
  });

  const handleUnpin = async (movieId: number) => {
    if (loading) return;

    if (!pinnedReviewsResult.data) return;

    const review = pinnedReviewsResult.data.pinnedReviews.find(
      review => review.movie.id === movieId,
    );

    if (!review) return;

    await pinReview({ variables: { reviewId: review.id } });
  };

  return {
    pinnedReviewsResult,

    handleUnpin,
  };
};
