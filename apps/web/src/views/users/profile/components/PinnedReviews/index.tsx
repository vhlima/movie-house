import { useState } from 'react';

import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { useAuth } from '@/hooks/useAuth';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Card } from '@/components';

import { ReviewList } from '@/components/review/ReviewList';

import PinnedReviewsEditModal from './components/PinnedReviewsEditModal';

import PencilButton from '../PencilButton';

export const PinnedReviews: React.FC = () => {
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

  const isSameUserAsSession = session && session.user.id === user.id;

  return (
    <>
      {isEditing && (
        <PinnedReviewsEditModal onClose={() => setEditing(false)} />
      )}

      <Card>
        <Card.Header title="Pinned reviews" marginBottom>
          {isSameUserAsSession && (
            <PencilButton onClick={() => setEditing(true)} />
          )}
        </Card.Header>

        <Card.Body>
          <ReviewList
            reviews={
              userPinnedReviewsData
                ? userPinnedReviewsData.reviews.edges.map(edge => edge.node)
                : []
            }
            emptyMessage={`${user.username} dont have any review pinned.`}
          />
        </Card.Body>
      </Card>
    </>
  );
};
