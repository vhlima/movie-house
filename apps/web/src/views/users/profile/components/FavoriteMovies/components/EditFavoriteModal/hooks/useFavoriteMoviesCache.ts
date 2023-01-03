import { useApolloClient } from '@apollo/client';

import type {
  FindUserFavoriteMoviesQuery,
  FindUserFavoriteMoviesQueryVariables,
} from '../../../../../../../../graphql';

import { FindUserFavoriteMoviesDocument } from '../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../hooks/useAuth';

type UpdateCacheHandles = (
  updateFn: (
    cacheData?: FindUserFavoriteMoviesQuery,
  ) => FindUserFavoriteMoviesQuery,
) => void;

interface FavoriteMoviesCacheHandles {
  updateCache: UpdateCacheHandles;
}

export const useFavoriteMoviesCache = (): FavoriteMoviesCacheHandles => {
  const { cache } = useApolloClient();

  const { data } = useAuth();

  const updateCache: UpdateCacheHandles = updateFn => {
    cache.updateQuery<
      FindUserFavoriteMoviesQuery,
      FindUserFavoriteMoviesQueryVariables
    >(
      {
        query: FindUserFavoriteMoviesDocument,
        variables: {
          userId: data.user.id,
        },
      },
      updateFn,
    );
  };

  return {
    updateCache,
  };
};
