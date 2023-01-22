import { useApolloClient } from '@apollo/client';

import type {
  FindUserPinnedReviewsQuery,
  FindUserPinnedReviewsQueryVariables,
} from '../../../../../../graphql';

import { FindUserPinnedReviewsDocument } from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

export const usePinnedReviewsCache = () => {
  const { cache } = useApolloClient();

  const { data } = useAuth();

  const updateCache = (
    updateFn: (
      cacheData: FindUserPinnedReviewsQuery,
    ) => FindUserPinnedReviewsQuery,
  ) => {
    cache.updateQuery<
      FindUserPinnedReviewsQuery,
      FindUserPinnedReviewsQueryVariables
    >(
      {
        query: FindUserPinnedReviewsDocument,
        variables: {
          userId: data.user.id,
        },
      },
      cacheData => (!cacheData ? cacheData : updateFn(cacheData)),
    );
  };

  return {
    updateCache,
  };
};
