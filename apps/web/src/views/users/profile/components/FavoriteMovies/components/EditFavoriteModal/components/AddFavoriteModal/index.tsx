import type { ModalHandles } from '../../../../../../../../../components/Modal';

import MovieSearchModal from '../../../../../../../../../components/movie/MovieSearchModal';

import { useLogic } from './logic';

type AddFavoriteMovieModalProps = ModalHandles;

const AddFavoriteMovieModal: React.FC<AddFavoriteMovieModalProps> = ({
  onClose,
}) => {
  const { error, resetMutation, handleAdd } = useLogic({ onClose });

  return (
    <MovieSearchModal
      title="Pick a favorite movie"
      description="Select one of your favorite movies to display on your profile"
      errors={error && [error.message]}
      onSelect={movie => handleAdd(movie.id)}
      onFocus={() => resetMutation()}
      onClose={onClose}
    />
  );
};

export default AddFavoriteMovieModal;
