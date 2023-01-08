import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

import type { Movie } from '../../../graphql';

import type { ModalHandles } from '../../Modal';

import { modalBottom } from '../../../animations';

import Modal from '../../Modal';

import MovieRateModal from '../MovieRateModal';

import Button from '../../Button';

import ActionButtons from './components/ActionButtons';

import AddMovieToListModal from './components/AddMovieToListModal';

interface MovieActionsModalProps extends ModalHandles {
  movie: Pick<Movie, 'id' | 'originalTitle'>;
}

const MovieActionsModal: React.FC<MovieActionsModalProps> = ({
  movie,
  onClose,
}) => {
  const { push } = useRouter();

  const redirectToCreateReviewPage = async () => {
    await push({
      pathname: '/reviews/create',
      query: { movie: movie.id },
    });
  };

  const [subModalOpen, setSubModalOpen] = useState<
    'rate' | 'addToList' | undefined
  >();

  switch (subModalOpen) {
    case 'rate': {
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

    case 'addToList': {
      return (
        <AddMovieToListModal
          movieId={movie.id}
          onClose={() => setSubModalOpen(undefined)}
        />
      );
    }

    default: {
      return (
        <Modal
          bottom
          backdrop
          showX={false}
          animation={modalBottom}
          onClose={onClose}
        >
          <div className="flex flex-col gap-4 mx-auto lg:w-fit lg:">
            <ActionButtons
              movieId={movie.id}
              onRate={() => setSubModalOpen('rate')}
            />

            <div className="flex flex-col gap-2 w-full">
              <Button
                buttonStyle="secondary"
                onClick={redirectToCreateReviewPage}
              >
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
    }
  }
};

export default MovieActionsModal;
