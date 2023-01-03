import type { ModalHandles } from '../../../../../../../../../../components/Modal';

import type {
  Review,
  FindUserReviewsQueryResult,
} from '../../../../../../../../../../graphql';

import {
  usePinReviewMutation,
  useFindUserReviewsQuery,
} from '../../../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../../../hooks/useAuth';

import { usePinnedReviewsCache } from '../../hooks/usePinnedReviewsCache';

type AddModalLogicProps = ModalHandles;

interface AddModalLogicHandles {
  reviewsResponse: FindUserReviewsQueryResult;

  handlePin: (reviewId: string) => Promise<void>;
}

export const useLogic = ({
  onClose,
}: AddModalLogicProps): AddModalLogicHandles => {
  const { data } = useAuth();

  const reviewsResponse = useFindUserReviewsQuery({
    variables: { userId: data.user.id },
  });

  const { updateCache } = usePinnedReviewsCache();

  const [pinReview, { loading }] = usePinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data || !data.pinReview.pinned) return;

      updateCache(cacheData => ({
        pinnedReviews: [
          ...(cacheData?.pinnedReviews || []),
          data.pinReview as Review,
        ],
      }));
    },
  });

  const handlePin = async (reviewId: string) => {
    if (loading) return;

    const { errors } = await pinReview({ variables: { reviewId } });

    if (!errors) {
      onClose();
    }
  };

  return {
    reviewsResponse,

    handlePin,
  };
};
