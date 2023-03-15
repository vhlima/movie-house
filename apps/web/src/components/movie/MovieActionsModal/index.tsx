import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import type { Movie } from '@/graphql';

import { Button } from '@/components';
import type { ModalHandles } from '../../Modal';

import { modalBottom } from '../../../animations';

import Modal from '../../Modal';

import MovieRateModal from '../MovieRateModal';

import RateButton from './components/RateButton';
import WatchListButton from './components/WatchListButton';
import MovieLikeButton from './components/MovieLikeButton';
import WatchButton from './components/WatchButton';
import AddMovieToListModal from './components/AddMovieToListModal';
import MovieReviewButton from './components/MovieReviewButton';

interface MovieActionsModalProps extends ModalHandles {
  movie: {
    id: Movie['id'];
    originalTitle: Movie['originalTitle'];
  };
}

const MovieActionsModal: React.FC<MovieActionsModalProps> = ({
  movie,
  onClose,
}) => {
  const [subModalOpen, setSubModalOpen] = useState<'rate' | 'addToList'>();

  if (subModalOpen) {
    if (subModalOpen === 'rate') {
      return (
        <AnimatePresence>
          <MovieRateModal
            movie={{
              originalTitle: movie.originalTitle,
            }}
            onClose={() => setSubModalOpen(undefined)}
          />
        </AnimatePresence>
      );
    }

    if (subModalOpen === 'addToList') {
      return (
        <AddMovieToListModal
          movieId={movie.id}
          onClose={() => setSubModalOpen(undefined)}
        />
      );
    }
  }

  return (
    <Modal bottom backdrop animation={modalBottom} onClose={onClose}>
      <div className="flex items-center justify-center gap-4 mb-2">
        <RateButton
          movieId={movie.id}
          onClick={() => setSubModalOpen('rate')}
        />

        <WatchButton movieId={movie.id} />

        <MovieLikeButton movieId={movie.id} />

        <WatchListButton movieId={movie.id} />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <MovieReviewButton movieId={movie.id} />

        <Button
          buttonStyle="secondary"
          onClick={() => setSubModalOpen('addToList')}
        >
          Add to list
        </Button>

        <Button buttonStyle="secondary">Share</Button>
      </div>
    </Modal>
  );
};

export default MovieActionsModal;
