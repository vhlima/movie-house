import type { ModalHandles } from '../../../../../../../../../components/Modal';

import {
  PreMadeListType,
  useAddMovieToPreMadeListMutation,
} from '../../../../../../../../../graphql';

import { useFavoriteMoviesCache } from '../../hooks/useFavoriteMoviesCache';

type AddFavoriteMovieModalLogicProps = ModalHandles;

export const useLogic = ({ onClose }: AddFavoriteMovieModalLogicProps) => {
  const { updateCache } = useFavoriteMoviesCache();

  const [addFavoriteMovie, { loading, error, reset }] =
    useAddMovieToPreMadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }) => {
        if (!data) return;

        updateCache(cacheData => ({
          userPreMadeListMovies: [
            ...cacheData.userPreMadeListMovies,
            data.userPreMadeListAddMovie.movie,
          ],
        }));
      },
    });

  const handleAddMovie = async (movieId: number) => {
    if (loading) return;

    const { data, errors } = await addFavoriteMovie({
      variables: { movieId, listType: PreMadeListType.Favorite },
    });

    if (!errors && data) {
      onClose();
    }
  };

  return {
    error,
    resetMutation: reset,

    handleAddMovie,
  };
};
