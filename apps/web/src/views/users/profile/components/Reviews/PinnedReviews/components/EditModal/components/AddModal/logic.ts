import type { ModalHandles } from '../../../../../../../../../../components/Modal';

import type {
  FindUserPinnedReviewsQuery,
  FindUserPinnedReviewsQueryVariables,
  FindUserReviewsQueryResult,
} from '../../../../../../../../../../graphql';

import {
  FindUserPinnedReviewsDocument,
  usePinReviewMutation,
  useFindUserReviewsQuery,
} from '../../../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../../../hooks/useAuth';

type AddModalLogicProps = ModalHandles;

interface AddModalLogicHandles {
  reviewsResponse: FindUserReviewsQueryResult;

  handlePin: (reviewId: string) => Promise<void>;
}

export const useLogic = ({
  onClose,
}: AddModalLogicProps): AddModalLogicHandles => {
  const { user } = useAuth();

  const reviewsResponse = useFindUserReviewsQuery({
    variables: { userId: user.id },
  });

  const [pinReview, { loading }] = usePinReviewMutation({
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data || !data.pinReview.pinned) return;

      cache.updateQuery<
        FindUserPinnedReviewsQuery,
        FindUserPinnedReviewsQueryVariables
      >(
        {
          query: FindUserPinnedReviewsDocument,
          variables: { userId: user.id },
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
