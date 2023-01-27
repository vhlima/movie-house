import { useState } from 'react';

import { useFindUserPinnedReviewsQuery } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../hooks/useProfile';

import Card from '../../../../../components/Card';

import Typography from '../../../../../components/Typography';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

import PinnedReviewsEditModal from './components/PinnedReviewsEditModal';

const PinnedReviews: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const { data: userPinnedReviewsData } = useFindUserPinnedReviewsQuery({
    variables: { userId: user?.id },
  });

  const [isEditing, setEditing] = useState<boolean>(false);

  const hasAnyReviewPinned =
    !!userPinnedReviewsData ||
    userPinnedReviewsData.reviewsUserPinned.length > 0;

  return (
    <>
      {isEditing && (
        <PinnedReviewsEditModal onClose={() => setEditing(false)} />
      )}

      <Card
        title="Pinned reviews"
        rightIcon={
          session &&
          session.user.id === user?.id && {
            iconType: 'FaPencilAlt',
            onClick: () => setEditing(true),
          }
        }
        noPadding
      >
        {!hasAnyReviewPinned ? (
          <Typography component="p">
            {user.username} dont have any review highlighted.
          </Typography>
        ) : (
          <ul>
            {userPinnedReviewsData.reviewsUserPinned.map(review => (
              <ReviewPreview
                key={`pinned-review-${review.id}`}
                review={review}
              />
            ))}
          </ul>
        )}
      </Card>
    </>
  );
};

export default PinnedReviews;
