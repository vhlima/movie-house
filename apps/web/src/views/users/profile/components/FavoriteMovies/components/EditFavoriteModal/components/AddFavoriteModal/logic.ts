import { PreMadeListType, useAddMovieToPreMadeListMutation } from '@/graphql';
import type { ModalHandles } from '../../../../../../../../../components/Modal';

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
          ...cacheData,
          preMadeListMovies: {
            ...cacheData.preMadeListMovies,
            totalCount: cacheData
              ? cacheData.preMadeListMovies.totalCount + 1
              : 1,
            edges: [
              ...cacheData.preMadeListMovies.edges,
              { node: data.addMovieToPreMadeList },
            ],
          },
        }));
      },
    });

  const handleAddMovie = async (movieId: number) => {
    if (loading) return;

    const { data } = await addFavoriteMovie({
      variables: { movieId, listType: PreMadeListType.Favorite },
    });

    if (data) {
      onClose();
    }
  };

  return {
    error,
    resetMutation: reset,

    handleAddMovie,
  };
};
