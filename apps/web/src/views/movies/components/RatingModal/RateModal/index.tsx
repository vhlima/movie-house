import { useState } from 'react';

import { useMutation } from '@apollo/client';

import type { MovieResponse } from '../../../../../types/movie';

import type { UserResponse } from '../../../../../types/user';

import { RATE_MOVIE } from '../../../../../graphql/user';

import { useAuth } from '../../../../../hooks/useAuth';

import type { ModalHandles, ModalProps } from '../../../../../components/Modal';

import Modal from '../../../../../components/Modal';

import Button from '../../../../../components/Button';

import SvgIcon from '../../../../../components/SvgIcon';

import Stars from './components/Stars';

interface MovieRateModalProps extends Required<ModalProps & ModalHandles> {
  movie: MovieResponse;
  // TODO these props can be extended from modal
}

const MovieRateModal: React.FC<MovieRateModalProps> = ({
  movie,
  animation,
  onClose,
}) => {
  const { user, setUser } = useAuth();

  const [userRating, setUserRating] = useState<number>(() => {
    const rate = user?.ratings.find(r => r.movie.id === movie.id);

    return rate ? rate.rating : 0;
  });

  const [userAddRateMutation, { loading }] = useMutation<{
    userAddRate: UserResponse;
  }>(RATE_MOVIE);

  const handleSubmit = async () => {
    if (!user) return;

    const { data } = await userAddRateMutation({
      variables: {
        userId: user._id,
        movieId: movie.id,
        data: {
          rating: userRating,
        },
      },
    });

    if (data) {
      setUser(data.userAddRate);
    }

    onClose();
  };

  return (
    <Modal bottom backdrop animation={animation} onClose={onClose}>
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
        <SvgIcon
          className="text-blue-500 transition-transform ease-out"
          iconType="AiFillStar"
          style={{ transform: `scale(${userRating * 0.05 + 1})` }}
          size={90}
        />

        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-3xl font-bold select-none">
          {userRating > 0 ? userRating : '?'}
        </span>
      </div>

      <div className="flex flex-col items-center gap-4 mb-14 text-grey-200">
        <button className="ml-auto" type="button" onClick={onClose}>
          <SvgIcon iconType="FiX" size={28} />
        </button>

        <span className="text-yellow-500 text-sm font-semibold font-mono uppercase">
          Rate this
        </span>

        <h1 className="text-2xl">{movie.original_title}</h1>

        <Stars
          userRating={userRating}
          onChange={rating => setUserRating(rating)}
        />

        <Button
          disabled={
            userRating ===
              user.ratings.find(r => r.movie.id === movie.id)?.rating || loading
          }
          onClick={handleSubmit}
        >
          Rate
        </Button>
      </div>
    </Modal>
  );
};

export default MovieRateModal;
