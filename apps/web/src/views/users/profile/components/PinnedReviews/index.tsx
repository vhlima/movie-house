import { useState } from 'react';

import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Typography, Card } from '@/components';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

import PinnedReviewsEditModal from './components/PinnedReviewsEditModal';

import PencilButton from '../PencilButton';

const PinnedReviews: React.FC = () => {
  const { data: session } = useAuth();

  const { user } = useProfile();

  const { data: userPinnedReviewsData } = useFindReviewsQuery({
    variables: {
      userId: user.id,
      page: 1,
      sort: { type: ReviewSortType.Pinned },
    },
  });

  const [isEditing, setEditing] = useState<boolean>(false);

  const hasAnyReviewPinned =
    userPinnedReviewsData && userPinnedReviewsData.reviews.totalCount > 0;

  const isSameUserAsSession = session && session.user.id === user.id;

  return (
    <>
      {isEditing && (
        <PinnedReviewsEditModal onClose={() => setEditing(false)} />
      )}

      <Card>
        <Card.Header title="Pinned reviews" marginBottom={!hasAnyReviewPinned}>
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
              {userPinnedReviewsData.reviews.edges.map(edge => (
                <ReviewPreview
                  key={`pinned-review-${edge.node.id}`}
                  review={edge.node}
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
