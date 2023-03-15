import { ReviewSortType, useFindReviewsQuery } from '@/graphql';
import { Typography, Modal } from '@/components';
import type { ModalHandles } from '@/components';
import { useAuth } from '@/hooks/useAuth';

import QueryState from '../../../../../../../components/QueryState';

import ReviewToPin from './components/ReviewToPin';

type PinnedReviewsAddModalProps = ModalHandles;

const PinnedReviewsAddModal: React.FC<PinnedReviewsAddModalProps> = ({
  onClose,
}) => {
  const { data: session } = useAuth();

  const { data, loading, error } = useFindReviewsQuery({
    fetchPolicy: 'no-cache',
    variables: {
      page: 1,
      sort: {
        type: ReviewSortType.Pinned,
        filter: 'false',
      },
      userId: session.user.id,
    },
  });

  const availableReviews = data ? data.reviews.edges : [];

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text="Pin your review" />

        <Typography component="h2" color="secondary">
          Here is a list with all reviews you have made.
        </Typography>

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      <QueryState loading={loading} error={error}>
        {availableReviews.length <= 0 ? (
          <Typography className="block text-center" component="span">
            You have no reviews to pin.
          </Typography>
        ) : (
          <ul className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {availableReviews.map(edge => (
              <ReviewToPin
                key={`review-to-pin-${edge.node.id}`}
                review={edge.node}
                onClose={onClose}
              />
            ))}
          </ul>
        )}
      </QueryState>
    </Modal>
  );
};

export default PinnedReviewsAddModal;
