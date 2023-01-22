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

import { useLogic } from './logic';

type PinnedReviewsEditModalProps = ModalHandles;

const PinnedReviewsEditModal: React.FC<PinnedReviewsEditModalProps> = ({
  onClose,
}) => {
  const { handleUnpinReview } = useLogic();

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
          renderCover={(index, movie) =>
            movie
              ? {
                  children: (
                    <button
                      className="flex items-center justify-center w-full"
                      type="button"
                      onClick={async () => {
                        // TODO temporary workaround
                        const review =
                          userPinnedReviewsData.reviewsUserPinned[index];

                        if (review) {
                          await handleUnpinReview(review.post.id);
                        }
                      }}
                    >
                      <SvgIcon
                        className="text-error-light"
                        iconType="FiX"
                        size={30}
                      />
                    </button>
                  ),
                }
              : {
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
                }
          }
        />
      )}

      {/* <QueryState loading={false} error={error}>
        {!data ? (
          Array.from({ length: 3 })
            .map((_, index) => index + 1)
            .map(n => (
              <MovieCover
                key={`edit-pinned-movie-empty-${n}`}
                sizeType="responsive"
              />
            ))
        ) : (
          <MovieCardsEditable
            maxMovies={3}
            movies={
              data.reviews
                .filter(review => review.pinned)
                .map(review => review.movie) as Movie[]
            }
            onAdd={() => setAdding(true)}
            onRemove={handleUnpin}
          />
        )}
      </QueryState> */}
    </Modal>
  );
};

export default PinnedReviewsEditModal;
