import { useMutation, useQuery } from '@apollo/client';

import type { QueryResult } from '@apollo/client';

import type { ModalHandles } from '../../../../../../../../../../components/Modal';

import type {
  FindPinnedReviewsResponse,
  FindReviewsInput,
  FindReviewsResponse,
} from '../../../../../../../../../../graphql/Review/types';

import type {
  PinReviewInput,
  PinReviewResponse,
} from '../../../../../../../../../../graphql/Profile/types';

import {
  FIND_PINNED_REVIEWS,
  FIND_REVIEWS,
} from '../../../../../../../../../../graphql/Review';

import { PIN_REVIEW } from '../../../../../../../../../../graphql/Profile';

import { useAuth } from '../../../../../../../../../../hooks/useAuth';

type AddModalLogicProps = ModalHandles;

interface AddModalLogicHandles {
  reviewsResponse: QueryResult<FindReviewsResponse, FindReviewsInput>;

  handlePin: (reviewId: string) => Promise<void>;
}

export const useLogic = ({
  onClose,
}: AddModalLogicProps): AddModalLogicHandles => {
  const { user } = useAuth();

  const reviewsResponse = useQuery<FindReviewsResponse, FindReviewsInput>(
    FIND_REVIEWS,
    { variables: { userId: user.id } },
  );

  const [pinReview, { loading }] = useMutation<
    PinReviewResponse,
    PinReviewInput
  >(PIN_REVIEW, {
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data || !data.pinReview.pinned) return;

      cache.updateQuery<FindPinnedReviewsResponse>(
        {
          query: FIND_PINNED_REVIEWS,
        },
        cacheData => ({
          pinnedReviews: [...(cacheData?.pinnedReviews || []), data.pinReview],
        }),
      );
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
