import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Button, Modal } from '@/components';
import { MovieRateModal } from '@/components/movie';
import type { ModalHandles } from '@/components';

import { modalBottom } from '../../../animations';

import RateButton from './components/RateButton';
import WatchListButton from './components/WatchListButton';
import MovieLikeButton from './components/MovieLikeButton';
import WatchButton from './components/WatchButton';
import AddMovieToListModal from './components/AddMovieToListModal';
import MovieReviewButton from './components/MovieReviewButton';

interface Props extends ModalHandles {
  id: number;
  originalTitle: string;
}

export const MovieActionsModal: React.FC<Props> = props => {
  const { id, originalTitle, onClose } = props;

  const [subModalOpen, setSubModalOpen] = useState<'rate' | 'addToList'>();

  if (subModalOpen) {
    if (subModalOpen === 'rate') {
      return (
        <AnimatePresence>
          <MovieRateModal
            movie={{
              originalTitle,
            }}
            onClose={() => setSubModalOpen(undefined)}
          />
        </AnimatePresence>
      );
    }

    if (subModalOpen === 'addToList') {
      return (
        <AddMovieToListModal
          movieId={id}
          onClose={() => setSubModalOpen(undefined)}
        />
      );
    }
  }

  return (
    <Modal
      bottom
      backdrop
      animation={modalBottom}
      onClose={onClose}
      data-testid="movie-actions-modal"
    >
      <div className="flex items-center justify-center gap-4 mb-2">
        <RateButton movieId={id} onClick={() => setSubModalOpen('rate')} />

        <WatchButton movieId={id} />

        <MovieLikeButton movieId={id} />

        <WatchListButton movieId={id} />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <MovieReviewButton movieId={id} />

        <Button intent="secondary" onClick={() => setSubModalOpen('addToList')}>
          Add to list
        </Button>

        <Button intent="secondary">Share</Button>
      </div>
    </Modal>
  );
};
