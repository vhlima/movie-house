import { useState } from 'react';

import { useMutation } from '@apollo/client';
import { useAuth } from '../../../../../../hooks/useAuth';

import Modal from '../../../../../../components/Modal';

import Button from '../../../../../../components/Button';

import SvgIcon from '../../../../../../components/SvgIcon';

import MovieCover from '../../../../../movies/components/Cover';

import EmptyMovieCard from '../EmptyCard';
import AddFavoriteMovieModal from '../AddModal';
import { UserResponse } from '../../../../../../types/user';
import { REMOVE_FAVORITE_MOVIE } from '../../../../../../graphql/user';

interface EditFavoriteMoviesModalProps {
  onClose: () => void;
}

const MAX_FAVORITE_MOVIES = 4;

const EditFavoriteMoviesModal: React.FC<EditFavoriteMoviesModalProps> = ({
  onClose,
}) => {
  const { user, setUser } = useAuth();

  const [isAdding, setAdding] = useState<boolean>(false);

  const [mutationRemoveFavoriteMovie] = useMutation<{
    userRemoveFavoriteMovie: UserResponse;
  }>(REMOVE_FAVORITE_MOVIE);

  const removeFavoriteMovie = async (movieId: string) => {
    const userResponse = await mutationRemoveFavoriteMovie({
      variables: { userId: user._id, movieId },
    });

    setUser(userResponse.data.userRemoveFavoriteMovie);
  };

  const freeSlotsArray = Array.from(
    {
      length: MAX_FAVORITE_MOVIES - user.favoriteMovies.length - 1,
    },
    (v, k) => k,
  );

  return isAdding ? (
    <AddFavoriteMovieModal onClose={() => setAdding(false)} />
  ) : (
    <Modal center onClickBackdrop={onClose}>
      <h1 className="text-grey-100 text-lg mb-2">Edit your favorite movies</h1>

      <div className="grid grid-cols-4 gap-2">
        {user.favoriteMovies.map(movie => (
          <div className="flex flex-col gap-2" key={movie.id}>
            <div className="h-28">
              <MovieCover coverUrl={movie.posterUrl} coverSize="full" />
            </div>

            <Button
              buttonStyle="danger"
              buttonSize="xs"
              onClick={() => removeFavoriteMovie(movie.id)}
            >
              X
            </Button>
          </div>
        ))}

        <EmptyMovieCard cardStyle="secondary" onClick={() => setAdding(true)}>
          <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
        </EmptyMovieCard>

        {freeSlotsArray.map(slot => (
          <EmptyMovieCard key={slot} cardStyle="secondary" />
        ))}
      </div>
    </Modal>
  );
};

export default EditFavoriteMoviesModal;
