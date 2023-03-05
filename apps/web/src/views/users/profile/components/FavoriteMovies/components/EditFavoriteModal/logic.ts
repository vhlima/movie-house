import {
  PreMadeListType,
  useFindPreMadeListMoviesQuery,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

import { useFavoriteMoviesCache } from './hooks/useFavoriteMoviesCache';

export const useLogic = () => {
  const { data } = useAuth();

  const favoriteMoviesResult = useFindPreMadeListMoviesQuery({
    variables: {
      userId: data.user.id,
      listType: PreMadeListType.Favorite,
      page: 1,
    },
  });

  const { updateCache } = useFavoriteMoviesCache();

  /* Update FavoriteMovies cache removing the movie passed */
  function handleUpdateCache(movieId: number) {
    updateCache(cacheData => ({
      ...cacheData,
      preMadeListMovies: {
        ...cacheData.preMadeListMovies,
        edges: cacheData.preMadeListMovies.edges.filter(
          edge => edge.node.id !== movieId,
        ),
      },
    }));
  }

  return {
    favoriteMoviesResult,
    handleUpdateCache,
  };
};
