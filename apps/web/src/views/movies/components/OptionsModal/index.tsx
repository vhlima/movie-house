import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import type { Movie } from '../../../../graphql';

import type { ModalHandles } from '../../../../components/Modal';

import { UserListType } from '../../../../graphql';

import { useLogic } from './logic';

import { modalBottom } from '../../../../animations';

import Modal from '../../../../components/Modal';

import InfoButton from './components/InfoButton';

import RateModal from '../RateModal';

import Button from '../../../../components/Button';
import AddMovieToListModal from './components/AddMovieToListModal';

interface MovieOptionsModalProps extends ModalHandles {
  movie: Movie;
}

const MovieOptionsModal: React.FC<MovieOptionsModalProps> = ({
  movie,
  onClose,
}) => {
  const {
    movieOptionsResponse: { data },

    handleAddMovieToList,
    handleRemoveMovieFromList,

    redirectToCreateReviewPage,
  } = useLogic({
    movie,
  });

  const [subModalOpen, setSubModalOpen] = useState<
    'rate' | 'addToList' | undefined
  >();

  switch (subModalOpen) {
    case 'rate': {
      return (
        <AnimatePresence>
          <RateModal movie={movie} onClose={() => setSubModalOpen(undefined)} />
        </AnimatePresence>
      );
    }

    case 'addToList': {
      return (
        <AddMovieToListModal
          movieId={movie.id}
          onClose={() => setSubModalOpen(undefined)}
        />
      );
    }

    default: {
      break;
    }
  }

  return (
    <Modal
      bottom
      backdrop
      showX={false}
      animation={modalBottom}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-8 text-grey-300">
          <InfoButton
            text="Rate"
            iconType={
              data?.movieRating?.rating > 0 ? 'AiFillStar' : 'AiOutlineStar'
            }
            iconColor={data?.movieRating ? 'blue' : undefined}
            onClick={() => setSubModalOpen('rate')}
          />

          <InfoButton
            text="Watch"
            iconType={data?.isOnWatchLater ? 'IoEye' : 'IoEyeOutline'}
            iconColor={data?.isOnWatchLater ? 'green' : undefined}
            onClick={() =>
              data?.isOnWatchLater
                ? handleAddMovieToList(UserListType.Watched)
                : handleRemoveMovieFromList(UserListType.Watched)
            }
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
            iconColor={data?.isOnWatchList ? 'blue' : undefined}
            onClick={() =>
              data?.isOnWatchList
                ? handleAddMovieToList(UserListType.Watchlist)
                : handleRemoveMovieFromList(UserListType.Watchlist)
            }
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Button buttonStyle="secondary" onClick={redirectToCreateReviewPage}>
            Review
          </Button>

          <Button
            buttonStyle="secondary"
            onClick={() => setSubModalOpen('addToList')}
          >
            Add to list
          </Button>

          <Button buttonStyle="secondary">Share</Button>
        </div>
      </div>
    </Modal>
  );
};

export default MovieOptionsModal;
