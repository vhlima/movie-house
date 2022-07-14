import { useMemo, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import type { MotionProps } from 'framer-motion';

import { useAuth } from '../../../../hooks/useAuth';

import { useLogic } from './logic';

import type { MovieResponse } from '../../../../types/movie';

import type { ModalHandles } from '../../../../components/Modal';

import Modal from '../../../../components/Modal';

import InfoButton from './components/InfoButton';

import MovieRateModal from './RateModal';

import Button from '../../../../components/Button';

interface MovieRatingModalProps extends ModalHandles {
  movie: MovieResponse;
}

const MovieRatingModal: React.FC<MovieRatingModalProps> = ({
  movie,
  onClose,
}) => {
  // TODO user required to use this modal

  const { user } = useAuth();

  // TODO prop drilling

  const { handleClick, handleWatchlist } = useLogic({ movie });

  const [isRating, setRating] = useState<boolean>(false);

  const userRate = useMemo(
    () => user.ratings.find(r => r.movie.id === movie.id),
    [user, movie],
  );

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

  return isRating ? (
    <AnimatePresence>
      <MovieRateModal
        movie={movie}
        animation={modalAnimation}
        onClose={() => setRating(false)}
      />
    </AnimatePresence>
  ) : (
    <Modal bottom backdrop animation={modalAnimation} onClose={onClose}>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-8 text-grey-300">
          <InfoButton
            text="Rate"
            iconType={userRate?.rating > 0 ? 'AiFillStar' : 'AiOutlineStar'}
            iconColor={userRate?.rating > 0 ? 'blue' : undefined}
            onClick={() => setRating(true)}
          />

          <InfoButton
            text="Watch"
            iconType={userRate?.watched ? 'IoEye' : 'IoEyeOutline'}
            iconColor={userRate?.watched ? 'green' : undefined}
            onClick={() => handleClick('watch')}
          />

          <InfoButton
            text="Like"
            iconType={userRate?.liked ? 'AiFillHeart' : 'AiOutlineHeart'}
            iconColor={userRate?.liked ? 'red' : undefined}
            onClick={() => handleClick('like')}
          />

          <InfoButton
            text="Watchlist"
            iconType="AiOutlineClockCircle"
            iconColor={
              user.watchlist.findIndex(m => m.id === movie.id) > 0
                ? 'blue'
                : undefined
            }
            onClick={handleWatchlist}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button buttonStyle="secondary">Review</Button>
          <Button buttonStyle="secondary">Add to list</Button>
          <Button buttonStyle="secondary">Share</Button>
        </div>
      </div>
    </Modal>
  );
};

export default MovieRatingModal;
