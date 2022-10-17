import { useApolloClient } from '@apollo/client';

import type {
  FindUserPinnedReviewsQuery,
  FindUserPinnedReviewsQueryVariables,
} from '../../../../../../../../../graphql';

import { FindUserPinnedReviewsDocument } from '../../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../../hooks/useAuth';

type UpdateCacheHandles = (
  updateFn: (
    cacheData?: FindUserPinnedReviewsQuery,
  ) => FindUserPinnedReviewsQuery,
) => void;

interface PinnedReviewsCacheHandles {
  updateCache: UpdateCacheHandles;
}

export const usePinnedReviewsCache = (): PinnedReviewsCacheHandles => {
  const { cache } = useApolloClient();

  const { user } = useAuth();

  const updateCache: UpdateCacheHandles = updateFn => {
    cache.updateQuery<
      FindUserPinnedReviewsQuery,
      FindUserPinnedReviewsQueryVariables
    >(
      {
        query: FindUserPinnedReviewsDocument,
        variables: {
          userId: user.id,
        },
      },
      updateFn,
    );
  };

  return {
    updateCache,
  };
};
