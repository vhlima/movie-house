import type { ModalHandles } from '../../../../../../../components/Modal';

import {
  usePinReviewMutation,
  useFindUserReviewsQuery,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

import { usePinnedReviewsCache } from '../../hooks/usePinnedReviewsCache';

type AddModalLogicProps = ModalHandles;

export const useLogic = ({ onClose }: AddModalLogicProps) => {
  const { data } = useAuth();

  const reviewsResponse = useFindUserReviewsQuery({
    variables: { userId: data.user.id },
  });

  const { updateCache } = usePinnedReviewsCache();

  const [pinReview] = usePinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data || !data.reviewPin.isPinned) return;

      updateCache(cacheData => ({
        reviewsUserPinned: [...cacheData.reviewsUserPinned, data.reviewPin],
      }));
    },
  });

  const handlePinReview = async (postId: number) => {
    const { errors } = await pinReview({ variables: { postId } });

    if (!errors) {
      onClose();
    }
  };

  return {
    reviewsResponse,
    handlePinReview,
  };
};
