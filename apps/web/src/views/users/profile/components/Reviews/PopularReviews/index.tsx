import type { Review } from '../../../../../../graphql';

import { useFindUserPopularReviewsQuery } from '../../../../../../graphql';

import { useProfile } from '../../../hooks/useProfile';

import ReviewCard from '../components/ReviewCard';

const PopularReviews: React.FC = () => {
  const { user } = useProfile();

  const { data, loading, error } = useFindUserPopularReviewsQuery({
    variables: { userId: user.id },
  });

  return (
    <ReviewCard
      title="Popular reviews"
      reviews={data?.popularReviews as Review[]}
      loading={loading}
      error={error}
    />
  );
};

export default PopularReviews;
