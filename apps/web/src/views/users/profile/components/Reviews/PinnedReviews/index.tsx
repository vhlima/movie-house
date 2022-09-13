import { useState } from 'react';

import { useQuery } from '@apollo/client';

import type {
  FindPinnedReviewsResponse,
  FindPinnedReviewsInput,
} from '../../../../../../graphql/Review/types';

import { FIND_PINNED_REVIEWS } from '../../../../../../graphql/Review';

import { useAuth } from '../../../../../../hooks/useAuth';

import { useProfile } from '../../../hooks/useProfile';

import EditPinnedReviewsModal from './components/EditModal';

import ReviewCard from '../components/ReviewCard';

const PinnedReviews: React.FC = () => {
  const { user: currentUser } = useAuth();

  const { user } = useProfile();

  const [isEditing, setEditing] = useState<boolean>(false);

  const { data, loading, error } = useQuery<
    FindPinnedReviewsResponse,
    FindPinnedReviewsInput
  >(FIND_PINNED_REVIEWS, { variables: { userId: user.id } });

  return (
    <>
      {isEditing && (
        <EditPinnedReviewsModal onClose={() => setEditing(false)} />
      )}

      <ReviewCard
        title="Pinned reviews"
        reviews={data?.pinnedReviews}
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
