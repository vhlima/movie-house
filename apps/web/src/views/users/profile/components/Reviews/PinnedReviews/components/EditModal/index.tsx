import { useState } from 'react';

import type { ModalHandles } from '../../../../../../../../components/Modal';

import { useLogic } from './logic';

import MovieCardList from '../../../../MovieCardList';

import Modal from '../../../../../../../../components/Modal';

import ErrorText from '../../../../../../../../components/ErrorText';

import AddPinnedReviewModal from './components/AddModal';

type EditPinnedReviewsModalProps = ModalHandles;

const EditPinnedReviewsModal: React.FC<EditPinnedReviewsModalProps> = ({
  onClose,
}) => {
  const { cachedPinnedReviews, error, handleUnpin } = useLogic();

  /* When set to true, add modal will be shown */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddPinnedReviewModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-4">Edit your pinned reviews</h1>

      {error && <ErrorText text={error.message} />}

      <MovieCardList
        maxMovies={4}
        movies={
          cachedPinnedReviews
            ? cachedPinnedReviews.pinnedReviews.map(
                pinnedReview => pinnedReview.movie,
              )
            : []
        }
        onClickAdd={() => setAdding(true)}
        onClickRemove={handleUnpin}
      />
    </Modal>
  );
};

export default EditPinnedReviewsModal;
