import { useAuth } from '../../../../../../hooks/useAuth';

import { useLogic } from './logic';

import type { ModalHandles } from '../../../../../../components/Modal';

import Modal from '../../../../../../components/Modal';

import Button from '../../../../../../components/Button';

import SvgIcon from '../../../../../../components/SvgIcon';

import MovieCover from '../../../../../movies/components/Cover';

import MovieSearchModal from '../../../../../movies/components/SearchModal';

interface EditFavoriteMoviesModalProps extends ModalHandles {
  maxFavorite: number;
}

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  maxFavorite,
  onClose,
}) => {
  const { user } = useAuth();

  const {
    freeSlots,

    addFavoriteMovie,
    addFavoriteResult,

    removeFavoriteMovie,
    removeFavoriteResult,

    isAdding,
    setAdding,
  } = useLogic({ maxFavorite });

  const error =
    addFavoriteResult?.error || removeFavoriteResult?.error || undefined;

  return isAdding ? (
    <MovieSearchModal
      title="Pick a favorite movie"
      description="Select one of your favorite movies to display on your profile"
      errors={error && [error.message]}
      onFocus={() => {
        addFavoriteResult.reset();
        removeFavoriteResult.reset();
      }}
      onSelect={movie => addFavoriteMovie(movie.id)}
      onClose={() => setAdding(false)}
    />
  ) : (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-2">Edit your favorite movies</h1>

      <div className="grid grid-cols-4 gap-2">
        {user.favoriteMovies.map(movie => (
          <div className="flex flex-col gap-2" key={movie.id}>
            <MovieCover coverUrl={movie.posterUrl} coverSize="full" />

            <Button
              buttonStyle="danger"
              buttonSize="xs"
              disabled={removeFavoriteResult.loading}
              onClick={() => removeFavoriteMovie(movie.id)}
            >
              X
            </Button>
          </div>
        ))}

        <MovieCover
          coverStyle="secondary"
          coverSize="full"
          onClick={() => setAdding(true)}
        >
          <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
        </MovieCover>

        {freeSlots.map(slot => (
          <MovieCover key={slot} coverStyle="secondary" coverSize="full" />
        ))}
      </div>
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
