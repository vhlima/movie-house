import { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { useRouter } from 'next/router';

import type { Movie } from '../../../../graphql';

import type { ModalHandles } from '../../../../components/Modal';

import { modalBottom } from '../../../../animations';

import Modal from '../../../../components/Modal';

import RateModal from '../RateModal';

import Button from '../../../../components/Button';

import InfoButtons from './components/InfoButtons';

import AddMovieToListModal from './components/AddMovieToListModal';

interface MovieOptionsModalProps extends ModalHandles {
  movie: Movie;
}

const MovieOptionsModal: React.FC<MovieOptionsModalProps> = ({
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
      return (
        <Modal
          bottom
          backdrop
          showX={false}
          animation={modalBottom}
          onClose={onClose}
        >
          <div className="flex flex-col gap-4 mx-auto lg:w-fit">
            <InfoButtons
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

export default MovieOptionsModal;
