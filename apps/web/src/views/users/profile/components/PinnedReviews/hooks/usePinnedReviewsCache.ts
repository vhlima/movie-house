import { useApolloClient } from '@apollo/client';

import {
  FindReviewsQuery,
  FindReviewsQueryVariables,
  ReviewSortType,
  FindReviewsDocument,
} from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

export const usePinnedReviewsCache = () => {
  const { cache } = useApolloClient();

  const { data } = useAuth();

  const updateCache = (
    updateFn: (cacheData: FindReviewsQuery) => FindReviewsQuery,
  ) => {
    cache.updateQuery<FindReviewsQuery, FindReviewsQueryVariables>(
      {
        query: FindReviewsDocument,
        variables: {
          userId: data.user.id,
          page: 1,
          sort: {
            type: ReviewSortType.Pinned,
          },
        },
      },
      cacheData => (!cacheData ? cacheData : updateFn(cacheData)),
    );
  };

  return {
    updateCache,
  };
};
