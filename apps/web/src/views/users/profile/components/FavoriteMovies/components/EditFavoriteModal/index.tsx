import { useState } from 'react';

import type { Movie } from '../../../../../../../graphql';

import type { ModalHandles } from '../../../../../../../components/Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../../components/Modal';

import QueryState from '../../../../../../../components/QueryState';

import MovieCardsEditable from '../../../MovieCardsEditable';

import AddFavoriteMovieModal from './components/AddFavoriteModal';

type EditFavoriteMoviesModalProps = ModalHandles;

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  onClose,
}) => {
  const {
    favoriteMoviesResult: { data, error },
    handleRemove,
  } = useLogic();

  /* Controls whether add favorite modal is shown or not */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddFavoriteMovieModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-4">Edit your favorite movies</h1>

      <QueryState loading={false} error={error}>
        {data && (
          <MovieCardsEditable
            movies={
              data.userFavoriteMovies.map(
                favoriteMovie => favoriteMovie.movie,
              ) as Movie[]
            }
            onAdd={() => setAdding(true)}
            onRemove={handleRemove}
          />
        )}
      </QueryState>
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
