import type { Review } from '../../../../../graphql';

import { useFindUserProfileFeaturedReviewsQuery } from '../../../../../graphql';

import { useProfile } from '../../hooks/useProfile';

import PinnedReviews from './PinnedReviews';

import ReviewCard from './components/ReviewCard';

const ReviewsCards: React.FC = () => {
  const { user } = useProfile();

  const { data } = useFindUserProfileFeaturedReviewsQuery({
    variables: { userId: user?.id },
  });

  return (
    <>
      <PinnedReviews />

      <ReviewCard
        title="Recent reviews"
        reviews={
          (data?.userProfileFeaturedReviews?.recentReviews ?? []) as Review[]
        }
      />

      <ReviewCard
        title="Popular reviews"
        reviews={
          (data?.userProfileFeaturedReviews?.popularReviews ?? []) as Review[]
        }
      />
    </>
  );
};

export default ReviewsCards;
