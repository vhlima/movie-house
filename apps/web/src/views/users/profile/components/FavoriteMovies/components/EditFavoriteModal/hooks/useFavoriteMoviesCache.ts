import { useApolloClient } from '@apollo/client';

import type {
  FindUserPreMadeListMoviesQuery,
  FindUserPreMadeListMoviesQueryVariables,
} from '../../../../../../../../graphql';

import {
  PreMadeListType,
  FindUserPreMadeListMoviesDocument,
} from '../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../hooks/useAuth';

type UpdateCacheHandles = (
  updateFn: (
    cacheData?: FindUserPreMadeListMoviesQuery,
  ) => FindUserPreMadeListMoviesQuery,
) => void;

interface FavoriteMoviesCacheHandles {
  updateCache: UpdateCacheHandles;
}

export const useFavoriteMoviesCache = (): FavoriteMoviesCacheHandles => {
  const { cache } = useApolloClient();

  const { data } = useAuth();

  const updateCache: UpdateCacheHandles = updateFn => {
    cache.updateQuery<
      FindUserPreMadeListMoviesQuery,
      FindUserPreMadeListMoviesQueryVariables
    >(
      {
        query: FindUserPreMadeListMoviesDocument,
        variables: {
          userId: data.user.id,
          listType: PreMadeListType.Favorite,
        },
      },
      cacheData => (!cacheData ? cacheData : updateFn(cacheData)),
    );
  };

  return {
    updateCache,
  };
};
