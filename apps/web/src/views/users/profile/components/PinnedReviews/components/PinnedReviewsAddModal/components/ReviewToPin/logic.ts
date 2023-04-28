import { FindReviewsQuery, useToggleReviewPinMutation } from '@/gql';

import type { ModalHandles } from '@/components';

import { usePinnedReviewsCache } from '../../../../hooks/usePinnedReviewsCache';

type AddModalLogicProps = ModalHandles & {
  review: FindReviewsQuery['reviews']['edges'][number]['node'];
};

export const useLogic = ({ review, onClose }: AddModalLogicProps) => {
  const { updateCache } = usePinnedReviewsCache();

  const [pinReview, { error }] = useToggleReviewPinMutation({
    errorPolicy: 'all',
    update: (_, { data }) => {
      if (!data || !data.toggleReviewPin) return;

      updateCache(cacheData => ({
        reviews: {
          ...cacheData.reviews,
          totalCount: cacheData.reviews.totalCount + 1,
          edges: [...cacheData.reviews.edges, { node: review }],
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
    handlePinReview,
  };
};
