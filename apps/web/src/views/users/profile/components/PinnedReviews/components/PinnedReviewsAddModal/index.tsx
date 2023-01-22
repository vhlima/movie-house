import type { ModalHandles } from '../../../../../../../components/Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../../components/Modal';

import QueryState from '../../../../../../../components/QueryState';

import Typography from '../../../../../../../components/Typography';

import ReviewToPin from './components/ReviewToPin';

type PinnedReviewsAddModalProps = ModalHandles;

const PinnedReviewsAddModal: React.FC<PinnedReviewsAddModalProps> = ({
  onClose,
}) => {
  const { reviewsResponse, handlePinReview } = useLogic({ onClose });

  const { data, loading, error } = reviewsResponse;

  const availableReviews = data
    ? data.reviewsUser.filter(review => !review.isPinned)
    : [];

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
            {availableReviews.map(review => (
              <ReviewToPin
                key={`review-to-pin-${review.id}`}
                review={review}
                onClick={reviewId => handlePinReview(reviewId)}
              />
            ))}
          </ul>
        )}
      </QueryState>
    </Modal>
  );
};

export default PinnedReviewsAddModal;
