import { format } from 'date-fns';

import type { ModalHandles } from '../../../../../../../../../../components/Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../../../../../components/Modal';

import Button from '../../../../../../../../../../components/Button';

import SvgIcon from '../../../../../../../../../../components/SvgIcon';

import ErrorText from '../../../../../../../../../../components/ErrorText';

import MovieCover from '../../../../../../../../../movies/components/Cover';

import LoadingSpinner from '../../../../../../../../../../components/LoadingSpinner';

type AddPinnedReviewModalProps = ModalHandles;

const AddPinnedReviewModal: React.FC<AddPinnedReviewModalProps> = ({
  onClose,
}) => {
  const {
    reviewsResponse: { data, loading, error },
    handlePin,
  } = useLogic({ onClose });

  const availableReviews = data
    ? data.reviews.filter(review => !review.pinned)
    : [];

  return (
    <Modal center backdrop onClose={onClose}>
      <h1 className="text-grey-100 text-lg mb-4">Chose a review to pin</h1>

      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {loading && <LoadingSpinner center />}

        {error && (
          <ErrorText text={`Error loading reviews: ${error.message}`} />
        )}

        {!error && !loading && availableReviews.length <= 0 ? (
          <span className="text-grey-200">You dont have any review to pin</span>
        ) : (
          availableReviews.map(review => (
            <div className="flex gap-2" key={review.id}>
              <MovieCover coverSize="sm" coverUrl={review.movie.posterUrl} />

              <div className="flex flex-col">
                <h1 className="text-grey-100">
                  <strong>{review.movie.originalTitle}</strong>

                  {review.movie.releaseDate &&
                    ` (${new Date(review.movie.releaseDate).getFullYear()})`}
                </h1>

                <span className="text-grey-200">
                  Reviewed in&nbsp;
                  {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                </span>

                <Button
                  className="flex items-center gap-1 mt-2"
                  buttonStyle="secondary"
                  onClick={() => handlePin(review.id)}
                >
                  <SvgIcon className="text-grey-300" iconType="BsFillPinFill" />

                  <span>Pin this review</span>
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default AddPinnedReviewModal;
