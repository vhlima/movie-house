import { format } from 'date-fns';

import type { ModalHandles } from '../../../../../../../../../../components/Modal';

import { useLogic } from './logic';

import Modal from '../../../../../../../../../../components/Modal';

import Button from '../../../../../../../../../../components/Button';

import SvgIcon from '../../../../../../../../../../components/SvgIcon';

import MovieCover from '../../../../../../../../../movies/components/Cover';

import QueryState from '../../../../../../../../../../components/QueryState';

import Typography from '../../../../../../../../../../components/Typography';

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
      <Typography className="mb-4" component="h1" color="primary" size="lg">
        Chose a review to pin
      </Typography>

      <QueryState loading={loading} error={error}>
        {availableReviews.length <= 0 ? (
          <Typography className="text-grey-200" component="span">
            You dont have any review to pin
          </Typography>
        ) : (
          <ul className="flex flex-col gap-2 max-h-96 overflow-y-auto">
            {availableReviews.map(review => (
              <li className="flex gap-2" key={review.id}>
                <MovieCover coverSize="sm" coverUrl={review.movie.posterUrl} />

                <section className="flex flex-col w-full">
                  <Typography component="h2" color="primary">
                    <strong>{review.movie.originalTitle}</strong>

                    {review.movie.releaseDate &&
                      ` (${new Date(review.movie.releaseDate).getFullYear()})`}
                  </Typography>

                  <Typography component="span">
                    Reviewed in&nbsp;
                    {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                  </Typography>

                  <Button
                    className="flex items-center gap-1 mt-2"
                    buttonStyle="secondary"
                    full={false}
                    onClick={() => handlePin(review.id)}
                  >
                    <SvgIcon
                      className="text-grey-300"
                      iconType="BsFillPinFill"
                    />

                    <Typography component="span">Pin this review</Typography>
                  </Button>
                </section>
              </li>
            ))}
          </ul>
        )}
      </QueryState>
    </Modal>
  );
};

export default AddPinnedReviewModal;
