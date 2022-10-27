import { useState } from 'react';

import type { ModalHandles } from '../../../../../../../../components/Modal';

import type { Movie } from '../../../../../../../../graphql';

import { useLogic } from './logic';

import Modal from '../../../../../../../../components/Modal';

import QueryState from '../../../../../../../../components/QueryState';

import MovieCardsEditable from '../../../../MovieCardsEditable';

import AddPinnedReviewModal from './components/AddModal';

type EditPinnedReviewsModalProps = ModalHandles;

const EditPinnedReviewsModal: React.FC<EditPinnedReviewsModalProps> = ({
  onClose,
}) => {
  const {
    pinnedReviewsResult: { data, error },
    handleUnpin,
  } = useLogic();

  /* When set to true, add modal will be shown */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <AddPinnedReviewModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-4">Edit your pinned reviews</h1>

      <QueryState loading={false} error={error}>
        {data && (
          <MovieCardsEditable
            maxMovies={3}
            movies={data.pinnedReviews.map(review => review.movie) as Movie[]}
            onAdd={() => setAdding(true)}
            onRemove={handleUnpin}
          />
        )}
      </QueryState>
    </Modal>
  );
};

export default EditPinnedReviewsModal;
