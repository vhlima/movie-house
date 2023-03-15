import { useToggleReviewPinMutation, useFindReviewsQuery } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

import type { ModalHandles } from '../../../../../../../components/Modal';

import { usePinnedReviewsCache } from '../../hooks/usePinnedReviewsCache';

type AddModalLogicProps = ModalHandles;

export const useLogic = ({ onClose }: AddModalLogicProps) => {
  const { data } = useAuth();

  const reviewsResponse = useFindReviewsQuery({
    variables: { userId: data.user.id, page: 1 },
  });

  const { updateCache } = usePinnedReviewsCache();

  const [pinReview, { error }] = useToggleReviewPinMutation({
    errorPolicy: 'all',
    update: (_, { data }, ctx) => {
      if (!data || !data.toggleReviewPin || !reviewsResponse.data) return;

      const review = reviewsResponse.data.reviews.edges.find(
        edge => edge.node.id === ctx.variables.reviewId,
      );

      if (!review) return;

      updateCache(cacheData => ({
        reviews: {
          ...cacheData.reviews,
          totalCount: cacheData.reviews.totalCount + 1,
          edges: [...cacheData.reviews.edges, review],
        },
      }));
    },
  });

  const handlePinReview = async (reviewId: string) => {
    await pinReview({ variables: { reviewId } });

    if (!error) {
      onClose();
    }
  };

  return {
    reviewsResponse,
    handlePinReview,
  };
};
