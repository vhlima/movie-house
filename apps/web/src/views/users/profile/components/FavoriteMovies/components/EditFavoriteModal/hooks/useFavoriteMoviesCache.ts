import { useApolloClient } from '@apollo/client';

import type {
  FindPreMadeListMoviesQuery,
  FindPreMadeListMoviesQueryVariables,
} from '@/gql';

import { PreMadeListType, FindPreMadeListMoviesDocument } from '@/gql';

import { useAuth } from '@/hooks/useAuth';

type UpdateCacheHandles = (
  updateFn: (
    cacheData?: FindPreMadeListMoviesQuery,
  ) => FindPreMadeListMoviesQuery,
) => void;

interface FavoriteMoviesCacheHandles {
  updateCache: UpdateCacheHandles;
}

export const useFavoriteMoviesCache = (): FavoriteMoviesCacheHandles => {
  const { cache } = useApolloClient();

  const { data } = useAuth();

  const updateCache: UpdateCacheHandles = updateFn => {
    cache.updateQuery<
      FindPreMadeListMoviesQuery,
      FindPreMadeListMoviesQueryVariables
    >(
      {
        query: FindPreMadeListMoviesDocument,
        variables: {
          userId: data.user.id,
          listType: PreMadeListType.Favorite,
          page: 1,
        },
      },
      cacheData => (!cacheData ? cacheData : updateFn(cacheData)),
    );
  };

  return {
    updateCache,
  };
};
