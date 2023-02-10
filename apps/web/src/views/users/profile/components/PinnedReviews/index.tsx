import { useState } from 'react';

import { useFindUserPinnedReviewsQuery } from '../../../../../graphql';

import { useAuth } from '../../../../../hooks/useAuth';

import { useProfile } from '../../../hooks/useProfile';

import Card from '../../../../../components/Card';
import Typography from '../../../../../components/Typography';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

import PinnedReviewsEditModal from './components/PinnedReviewsEditModal';

import PencilButton from '../PencilButton';

const PinnedReviews: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const { data: userPinnedReviewsData } = useFindUserPinnedReviewsQuery({
    variables: { userId: user.id },
  });

  const [isEditing, setEditing] = useState<boolean>(false);

  const hasAnyReviewPinned =
    userPinnedReviewsData && userPinnedReviewsData.reviewsUserPinned.length > 0;

  const isSameUserAsSession = session && session.user.id === user.id;

  return (
    <>
      {isEditing && (
        <PinnedReviewsEditModal onClose={() => setEditing(false)} />
      )}

      <Card>
        <Card.Header title="Pinned reviews">
          {isSameUserAsSession && (
            <PencilButton onClick={() => setEditing(true)} />
          )}
        </Card.Header>

        <Card.Body>
          {!hasAnyReviewPinned ? (
            <Typography component="p">
              {user.username} dont have any review pinned.
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
        </Card.Body>
      </Card>
    </>
  );
};

export default PinnedReviews;
