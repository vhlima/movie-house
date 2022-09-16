import { useState } from 'react';

import type { Review } from '../../../../../../graphql';

import { useFindUserPinnedReviewsQuery } from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

import { useProfile } from '../../../hooks/useProfile';

import EditPinnedReviewsModal from './components/EditModal';

import ReviewCard from '../components/ReviewCard';

const PinnedReviews: React.FC = () => {
  const { user: currentUser } = useAuth();

  const { user } = useProfile();

  const [isEditing, setEditing] = useState<boolean>(false);

  const { data, loading, error } = useFindUserPinnedReviewsQuery({
    variables: { userId: user.id },
  });

  return (
    <>
      {isEditing && (
        <EditPinnedReviewsModal onClose={() => setEditing(false)} />
      )}

      <ReviewCard
        title="Pinned reviews"
        reviews={data?.pinnedReviews as Review[]}
        loading={loading}
        error={error}
        rightIcon={
          currentUser &&
          currentUser.id === user.id && {
            iconType: 'FaPencilAlt',
            onClick: () => setEditing(true),
          }
        }
      />
    </>
  );
};

export default PinnedReviews;
