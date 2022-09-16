import { useState } from 'react';

import type { ModalHandles } from '../../../../../../../components/Modal';

import type {
  Movie,
  FindUserFavoriteMoviesQuery,
} from '../../../../../../../graphql';

import {
  UserListType,
  FindUserFavoriteMoviesDocument,
  useRemoveMovieFromPremadeListMutation,
} from '../../../../../../../graphql';

import Modal from '../../../../../../../components/Modal';

import MovieCardList from '../../../MovieCardList';

import ErrorText from '../../../../../../../components/ErrorText';

import AddFavoriteMovieModal from './components/AddFavoriteModal';

interface EditFavoriteMoviesModalProps extends ModalHandles {
  favoriteMovies: Movie[];
}

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  favoriteMovies,
  onClose,
}) => {
  /* When set to true, add modal will be shown */
  const [isAdding, setAdding] = useState<boolean>(false);

  const [removeFavoriteMovie, { loading, error }] =
    useRemoveMovieFromPremadeListMutation({
      errorPolicy: 'all',
      update: (cache, { data }, context) => {
        if (!data) return;

        cache.updateQuery<FindUserFavoriteMoviesQuery>(
          {
            query: FindUserFavoriteMoviesDocument,
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

    await removeFavoriteMovie({
      variables: { listType: UserListType.Favorite, movieId },
    });
  };

  if (isAdding) {
    return <AddFavoriteMovieModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-4">Edit your favorite movies</h1>

      {error && <ErrorText text={error.message} />}

      <MovieCardList
        maxMovies={4}
        movies={favoriteMovies.map(favoriteMovie => favoriteMovie)}
        onClickAdd={() => setAdding(true)}
        onClickRemove={handleRemove}
      />
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
