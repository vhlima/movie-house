import type { Review } from '../../../../../../graphql';

import { useFindUserRecentReviewsQuery } from '../../../../../../graphql';

import { useProfile } from '../../../hooks/useProfile';

import ReviewCard from '../components/ReviewCard';

const PopularReviews: React.FC = () => {
  const { user } = useProfile();

  const { data, loading, error } = useFindUserRecentReviewsQuery({
    variables: { userId: user.id },
  });

  return (
    <ReviewCard
      title="Recent reviews"
      reviews={data?.recentReviews as Review[]}
      loading={loading}
      error={error}
    />
  );
};

export default PopularReviews;
