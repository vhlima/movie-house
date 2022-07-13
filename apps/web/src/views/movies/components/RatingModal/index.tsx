import { useMemo, useState } from 'react';

import { MotionProps } from 'framer-motion';

import { useMutation } from '@apollo/client';

import type { MovieResponse } from '../../../../types/movie';

import type { UserResponse } from '../../../../types/user';

import { ADD_MOVIE_INFO } from '../../../../graphql/user';

import { useAuth } from '../../../../hooks/useAuth';

import Modal from '../../../../components/Modal';

import Button from '../../../../components/Button';

import SvgIcon from '../../../../components/SvgIcon';

import Stars from './components/Stars';

interface MovieRatingModalProps {
  movie: MovieResponse;
  onClose: () => void;
}

const MovieRatingModal: React.FC<MovieRatingModalProps> = ({
  movie,
  onClose,
}) => {
  const { user, setUser } = useAuth();

  const [userRating, setUserRating] = useState<number>(() => {
    const movieInfo = user?.moviesInfo.find(mi => mi.movie.id === movie.id);

    if (movieInfo) {
      return movieInfo.rating;
    }

    return 0;
  });

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [addUserMovieInfo] = useMutation<{ userAddMovieInfo: UserResponse }>(
    ADD_MOVIE_INFO,
  );

  const handleSubmit = async () => {
    if (!user || isSubmitting) return;

    setSubmitting(true);

    const userResponse = await addUserMovieInfo({
      variables: {
        data: { userId: user._id, movieId: movie.id, rating: userRating },
      },
    });

    if (userResponse.data) {
      setUser(userResponse.data.userAddMovieInfo);
    }

    setSubmitting(false);

    onClose();
  };

  const modalAnimation: MotionProps = useMemo(
    () => ({
      initial: 'hidden',
      animate: 'visible',
      exit: {
        y: '80%',
        transition: {
          duration: 0.2,
        },
      },
      variants: {
        hidden: { opacity: 0, y: '80%' },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.2,
          },
        },
      },
    }),
    [],
  );

  return (
    <Modal
      className="absolute bottom-0 w-full rounded-t-md"
      animation={modalAnimation}
      onClickBackdrop={onClose}
    >
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
              user?.moviesInfo.find(mi => mi.movie.id === movie.id).rating ||
            isSubmitting
          }
          onClick={handleSubmit}
        >
          Rate
        </Button>
      </div>
    </Modal>
  );
};

export default MovieRatingModal;
