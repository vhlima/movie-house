import { useMemo, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import type { MotionProps } from 'framer-motion';

import { useRouter } from 'next/router';

import type { Movie } from '../../../../graphql';

import type { ModalHandles } from '../../../../components/Modal';

import { useAuth } from '../../../../hooks/useAuth';

import { useLogic } from './logic';

import { modalBottom } from '../../../../animations';

import Modal from '../../../../components/Modal';

import InfoButton from './components/InfoButton';

import RateModal from '../RateModal';

import Button from '../../../../components/Button';

interface MovieOptionsModalProps extends ModalHandles {
  movie: Movie;
}

const MovieOptionsModal: React.FC<MovieOptionsModalProps> = ({
  movie,
  onClose,
}) => {
  const { push } = useRouter();

  // TODO user required to use this modal

  const { user } = useAuth();

  // TODO prop drilling

  // const { handleClick, handleWatchlist } = useLogic({ movie });

  const [isRating, setRating] = useState<boolean>(false);

  // const userRate = useMemo(
  //   () => user.ratings.find(r => r.movie.id === movie.id),
  //   [user, movie],
  // );

  const redirectReview = () => {
    push({
      pathname: '/reviews/create',
      query: { movie: movie.id },
    });
  };

  return isRating ? (
    <AnimatePresence>
      <RateModal movie={movie} onClose={() => setRating(false)} />
    </AnimatePresence>
  ) : (
    <Modal bottom backdrop animation={modalBottom} onClose={onClose}>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-8 text-grey-300">
          <InfoButton
            text="Rate"
            iconType="AiOutlineStar"
            iconColor="blue"
            // iconType={userRate?.rating > 0 ? 'AiFillStar' : 'AiOutlineStar'}
            // iconColor={userRate?.rating > 0 ? 'blue' : undefined}
            onClick={() => setRating(true)}
          />

          <InfoButton
            text="Watch"
            iconType="IoEyeOutline"
            // iconType={userRate?.watched ? 'IoEye' : 'IoEyeOutline'}
            // iconColor={userRate?.watched ? 'green' : undefined}
            // onClick={() => handleClick('watch')}
          />

          <InfoButton
            text="Like"
            iconType="AiOutlineHeart"
            // iconType={userRate?.liked ? 'AiFillHeart' : 'AiOutlineHeart'}
            // iconColor={userRate?.liked ? 'red' : undefined}
            // onClick={() => handleClick('like')}
          />

          <InfoButton
            text="Watchlist"
            iconType="AiOutlineClockCircle"
            // iconColor={
            //   user.watchlist.findIndex(m => m.id === movie.id) > 0
            //     ? 'blue'
            //     : undefined
            // }
            // onClick={handleWatchlist}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button buttonStyle="secondary" onClick={redirectReview}>
            Review
          </Button>
          <Button buttonStyle="secondary">Add to list</Button>
          <Button buttonStyle="secondary">Share</Button>
        </div>
      </div>
    </Modal>
  );
};

export default MovieOptionsModal;
