import {
  LimitType,
  PreMadeListType,
  useFindLimitQuery,
  useFindUserPreMadeListMoviesQuery,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

import { useFavoriteMoviesCache } from './hooks/useFavoriteMoviesCache';

export const useLogic = () => {
  const { data } = useAuth();

  const favoriteMoviesResult = useFindUserPreMadeListMoviesQuery({
    variables: { userId: data.user.id, listType: PreMadeListType.Favorite },
  });

  /* Value needed to adjust the UI based on the limit */
  const { data: limitResult } = useFindLimitQuery({
    variables: { limitType: LimitType.MaxFavoriteMovies },
  });

  const { updateCache } = useFavoriteMoviesCache();

  /* Update FavoriteMovies cache removing the movie passed */
  function handleUpdateCache(movieId: number) {
    updateCache(cacheData => ({
      ...cacheData,
      userPreMadeListMovies: cacheData.userPreMadeListMovies.filter(
        movie => movie.id !== movieId,
      ),
    }));
  }

  return {
    limitResult,
    favoriteMoviesResult,

    handleUpdateCache,
  };
};
