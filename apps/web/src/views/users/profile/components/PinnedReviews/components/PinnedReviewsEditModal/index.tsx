import clsx from 'clsx';

import { useState } from 'react';

import type { ModalHandles } from '../../../../../../../components/Modal';

import {
  LimitType,
  useFindLimitQuery,
  useFindUserPinnedReviewsQuery,
} from '../../../../../../../graphql';

import { useAuth } from '../../../../../../../hooks/useAuth';

import Modal from '../../../../../../../components/Modal';

import SvgIcon from '../../../../../../../components/SvgIcon';

import Typography from '../../../../../../../components/Typography';

import MovieCoverList from '../../../../../../../components/movie/MovieCoverList';

import PinnedReviewsAddModal from '../PinnedReviewsAddModal';

import UnpinReviewButton from './components/UnpinReviewButton';

type PinnedReviewsEditModalProps = ModalHandles;

const PinnedReviewsEditModal: React.FC<PinnedReviewsEditModalProps> = ({
  onClose,
}) => {
  const { data: session } = useAuth();

  const { data: userPinnedReviewsData } = useFindUserPinnedReviewsQuery({
    variables: { userId: session.user.id },
  });

  const { data: limitData } = useFindLimitQuery({
    variables: { limitType: LimitType.MaxPinnedReviews },
  });

  /* When set to true, add modal will be shown */
  const [isAdding, setAdding] = useState<boolean>(false);

  if (isAdding) {
    return <PinnedReviewsAddModal onClose={() => setAdding(false)} />;
  }

  return (
    <Modal center backdrop onClose={onClose}>
      <Modal.Header>
        <Modal.Title text="Edit pinned reviews" />

        <Typography component="h2" color="secondary">
          Select wich reviews you want to be highlighted in your profile.
        </Typography>

        <Modal.CloseButton onClose={onClose} />
      </Modal.Header>

      {userPinnedReviewsData && limitData && (
        <MovieCoverList
          className="grid-cols-3"
          name="edit-pinned-review"
          empty={
            limitData.limit.limit -
            userPinnedReviewsData.reviewsUserPinned.length
          }
          movies={userPinnedReviewsData.reviewsUserPinned.map(
            review => review.movie,
          )}
          link={false}
          renderCover={(index, movie) => {
            if (movie) {
              const review = userPinnedReviewsData.reviewsUserPinned[index];

              if (review) {
                return <UnpinReviewButton postId={review.post.id} />;
              }
            }

            return {
              className: clsx({
                'hover:border-movieHouse-mid': index === 0,
              }),
              children: index === 0 && (
                <button
                  className="flex items-center justify-center w-full h-full"
                  type="button"
                  onClick={() => setAdding(true)}
                >
                  <SvgIcon iconType="AiOutlinePlusCircle" size={30} />
                </button>
              ),
            };
          }}
        />
      )}
    </Modal>
  );
};

export default PinnedReviewsEditModal;
