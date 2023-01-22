import {
  PreMadeListType,
  useRemoveMovieFromPreMadeListMutation,
  useFindUserPreMadeListMoviesQuery,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

import { useFavoriteMoviesCache } from './hooks/useFavoriteMoviesCache';

export const useLogic = () => {
  const { data } = useAuth();

  /* 
    Favorite movies are stored in cache because we already 
    fetched from FavoriteMovies component.
  */
  const favoriteMoviesResult = useFindUserPreMadeListMoviesQuery({
    variables: { userId: data.user.id, listType: PreMadeListType.Favorite },
  });

  const { updateCache } = useFavoriteMoviesCache();

  const [removeFavoriteMovie, { loading }] =
    useRemoveMovieFromPreMadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }, context) => {
        if (!data) return;

        updateCache(cacheData => ({
          userPreMadeListMovies: cacheData.userPreMadeListMovies.filter(
            ({ movie }) => movie.id !== context.variables.movieId,
          ),
        }));
      },
    });

  const handleRemoveMovie = async (movieId: number) => {
    if (loading) return;

    await removeFavoriteMovie({
      variables: { movieId, listType: PreMadeListType.Favorite },
    });
  };

  return {
    favoriteMoviesResult,

    handleRemoveMovie,
  };
};
