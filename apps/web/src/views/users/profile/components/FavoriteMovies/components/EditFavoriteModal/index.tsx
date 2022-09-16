import { useState } from 'react';

import type { ModalHandles } from '../../../../../../../components/Modal';

import type { Movie } from '../../../../../../../graphql';

import { useLogic } from './logic';

import Modal from '../../../../../../../components/Modal';

import MovieCardList from '../../../MovieCardList';

import ErrorText from '../../../../../../../components/ErrorText';

import AddFavoriteMovieModal from './components/AddFavoriteModal';

type EditFavoriteMoviesModalProps = ModalHandles;

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  onClose,
}) => {
  const { data, error, handleRemove } = useLogic();

  /* Controls whether modal is shown or not */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddFavoriteMovieModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-4">Edit your favorite movies</h1>

      {error && <ErrorText text={error.message} />}

      <MovieCardList
        maxMovies={4}
        movies={
          data
            ? (data.favoriteMovies.map(
                favoriteMovie => favoriteMovie.movie,
              ) as Movie[])
            : []
        }
        onClickAdd={() => setAdding(true)}
        onClickRemove={handleRemove}
      />
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
