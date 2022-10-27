import { useState } from 'react';

import type { Review } from '../../../../../../graphql';

import { useFindUserProfileFeaturedReviewsQuery } from '../../../../../../graphql';

import { useAuth } from '../../../../../../hooks/useAuth';

import { useProfile } from '../../../hooks/useProfile';

import EditPinnedReviewsModal from './components/EditModal';

import ReviewCard from '../components/ReviewCard';

const PinnedReviews: React.FC = () => {
  const { user: currentUser } = useAuth();

  const { user } = useProfile();

  const { data } = useFindUserProfileFeaturedReviewsQuery({
    variables: { userId: user?.id },
  });

  const [isEditing, setEditing] = useState<boolean>(false);

  return (
    <>
      {isEditing && (
        <EditPinnedReviewsModal onClose={() => setEditing(false)} />
      )}

      <ReviewCard
        title="Pinned reviews"
        reviews={
          (data?.userProfileFeaturedReviews?.pinnedReviews ?? []) as Review[]
        }
        rightIcon={
          currentUser &&
          currentUser.id === user?.id && {
            iconType: 'FaPencilAlt',
            onClick: () => setEditing(true),
          }
        }
      />
    </>
  );
};

export default PinnedReviews;
