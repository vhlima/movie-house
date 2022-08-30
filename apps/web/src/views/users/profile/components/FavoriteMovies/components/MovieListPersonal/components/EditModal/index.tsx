import { v4 as uuid } from 'uuid';

import { useMutation } from '@apollo/client';

import type { ModalHandles } from '../../../../../../../../../components/Modal';

import type {
  FavoriteMovieData,
  FindFavoriteMoviesResponse,
  RemoveFavoriteMovieInput,
} from '../../../../../../../../../graphql/FavoriteMovie/types';

import {
  FIND_FAVORITE_MOVIES,
  REMOVE_FAVORITE_MOVIE,
} from '../../../../../../../../../graphql/FavoriteMovie';

import Modal from '../../../../../../../../../components/Modal';

import Button from '../../../../../../../../../components/Button';

import SvgIcon from '../../../../../../../../../components/SvgIcon';

import MovieCover from '../../../../../../../../movies/components/Cover';

import ErrorText from '../../../../../../../../../components/ErrorText';

interface EditFavoriteMoviesModalProps extends ModalHandles {
  favoriteMovies: FavoriteMovieData[];
  onClickAdd: () => void;
}

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  favoriteMovies,
  onClickAdd,
  onClose,
}) => {
  const [removeFavoriteMovie, { loading, error }] = useMutation<
    string,
    RemoveFavoriteMovieInput
  >(REMOVE_FAVORITE_MOVIE, {
    errorPolicy: 'all',
    update: (cache, { data }, context) => {
      if (!data) return;

      cache.updateQuery<FindFavoriteMoviesResponse>(
        {
          query: FIND_FAVORITE_MOVIES,
        },
        cacheData => ({
          favoriteMovies: (cacheData.favoriteMovies || []).filter(
            favoriteMovie =>
              favoriteMovie.movie.id !== context.variables.movieId,
          ),
        }),
      );
    },
  });

  const handleRemove = async (movieId: number) => {
    if (loading) return;

    await removeFavoriteMovie({ variables: { movieId } });
  };

  const emptySlots = favoriteMovies.filter(favoriteMovie => !favoriteMovie);

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-2">Edit your favorite movies</h1>

      {error && <ErrorText text={error.message} />}

      <div className="grid grid-cols-4 gap-2">
        {favoriteMovies
          .filter(favoriteMovie => !!favoriteMovie)
          .map(favoriteMovie => (
            <div className="flex flex-col gap-2" key={favoriteMovie.id}>
              <MovieCover
                coverUrl={favoriteMovie.movie.posterUrl}
                coverSize="full"
              />

              <Button
                buttonStyle="danger"
                buttonSize="xs"
                disabled={loading}
                onClick={() => handleRemove(favoriteMovie.movie.id)}
              >
                X
              </Button>
            </div>
          ))}

        {emptySlots.map((_, index) =>
          index === 0 ? (
            <MovieCover
              key={uuid()}
              coverStyle="secondary"
              coverSize="full"
              onClick={onClickAdd}
            >
              <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
            </MovieCover>
          ) : (
            <MovieCover key={uuid()} coverStyle="secondary" coverSize="full" />
          ),
        )}
      </div>
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
