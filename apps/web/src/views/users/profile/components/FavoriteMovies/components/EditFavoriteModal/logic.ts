import type { FindUserFavoriteMoviesQueryResult } from '../../../../../../../graphql';

import {
  UserListType,
  useRemoveMovieFromPremadeListMutation,
  useFindUserFavoriteMoviesQuery,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

import { useFavoriteMoviesCache } from './hooks/useFavoriteMoviesCache';

type RemoveHandles = (movieId: number) => Promise<void>;

interface EditFavoriteMovieModalLogicHandles {
  favoriteMoviesResult: FindUserFavoriteMoviesQueryResult;

  handleRemove: RemoveHandles;
}

export const useLogic = (): EditFavoriteMovieModalLogicHandles => {
  const { data } = useAuth();

  /* 
    Favorite movies are stored in cache because we already 
    fetched from FavoriteMovies component.
  */
  const favoriteMoviesResult = useFindUserFavoriteMoviesQuery({
    variables: { userId: data.user.id },
    fetchPolicy: 'cache-only',
  });

  const { updateCache } = useFavoriteMoviesCache();

  const [removeFavoriteMovie, { loading }] =
    useRemoveMovieFromPremadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }, context) => {
        if (!data) return;

        /* Remove movie from favorite movies list cache */
        updateCache(cacheData => ({
          userFavoriteMovies: cacheData.userFavoriteMovies.filter(
            ({ movie }) => movie.id !== context.variables.movieId,
          ),
        }));
      },
    });

  const handleRemove: RemoveHandles = async movieId => {
    if (loading) return;

    await removeFavoriteMovie({
      variables: { movieId, listType: UserListType.Favorite },
    });
  };

  return {
    favoriteMoviesResult,

    handleRemove,
  };
};
