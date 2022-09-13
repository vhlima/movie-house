import { useQuery } from '@apollo/client';

import type {
  FindRecentReviewsInput,
  FindRecentReviewsResponse,
} from '../../../../../../graphql/Review/types';

import { FIND_RECENT_REVIEWS } from '../../../../../../graphql/Review';

import { useProfile } from '../../../hooks/useProfile';

import ReviewCard from '../components/ReviewCard';

const PopularReviews: React.FC = () => {
  const { user } = useProfile();

  const { data, loading, error } = useQuery<
    FindRecentReviewsResponse,
    FindRecentReviewsInput
  >(FIND_RECENT_REVIEWS, {
    variables: { userId: user.id },
  });

  return (
    <ReviewCard
      title="Recent reviews"
      reviews={data?.recentReviews}
      loading={loading}
      error={error}
    />
  );
};

export default PopularReviews;
