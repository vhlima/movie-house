import { useUnpinReviewMutation } from '../../../../../../../graphql';

import { usePinnedReviewsCache } from '../../hooks/usePinnedReviewsCache';

export const useLogic = () => {
  const { updateCache } = usePinnedReviewsCache();

  const [unpinReview] = useUnpinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data || data.reviewUnpin.isPinned) return;

      updateCache(cacheData => ({
        reviewsUserPinned: cacheData.reviewsUserPinned.filter(
          review => review.id !== data.reviewUnpin.id,
        ),
      }));
    },
  });

  const handleUnpinReview = async (postId: number) => {
    await unpinReview({ variables: { postId } });
  };

  return {
    handleUnpinReview,
  };
};
