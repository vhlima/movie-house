import { useMutation } from '@apollo/client';

import type { ModalHandles } from '../../../../../../../../../components/Modal';

import type {
  AddFavoriteMovieResponse,
  AddFavoriteMovieInput,
  FindFavoriteMoviesResponse,
} from '../../../../../../../../../graphql/FavoriteMovie/types';

import {
  ADD_FAVORITE_MOVIE,
  FIND_FAVORITE_MOVIES,
} from '../../../../../../../../../graphql/FavoriteMovie';

import MovieSearchModal from '../../../../../../../../movies/components/SearchModal';

type AddFavoriteMovieModalProps = ModalHandles;

const AddFavoriteMovieModal: React.FC<AddFavoriteMovieModalProps> = ({
  onClose,
}) => {
  const [addFavoriteMovie, { loading, error, reset }] = useMutation<
    AddFavoriteMovieResponse,
    AddFavoriteMovieInput
  >(ADD_FAVORITE_MOVIE, {
    errorPolicy: 'all',
    update: (cache, { data }) => {
      if (!data) return;

      cache.updateQuery<FindFavoriteMoviesResponse>(
        {
          query: FIND_FAVORITE_MOVIES,
        },
        cacheData => ({
          favoriteMovies: [
            ...(cacheData?.favoriteMovies || []),
            data.addFavoriteMovie,
          ],
        }),
      );
    },
  });

  const handleAdd = async ({ movieId }: AddFavoriteMovieInput) => {
    if (loading) return;

    const { data, errors } = await addFavoriteMovie({ variables: { movieId } });

    if (!errors && data) {
      onClose();
    }
  };

  return (
    <MovieSearchModal
      title="Pick a favorite movie"
      description="Select one of your favorite movies to display on your profile"
      errors={error && [error.message]}
      onSelect={movie => handleAdd({ movieId: movie.id })}
      onFocus={() => reset()}
      onClose={onClose}
    />
  );
};

export default AddFavoriteMovieModal;
