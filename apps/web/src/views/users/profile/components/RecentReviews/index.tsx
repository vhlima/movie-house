import { useQuery } from '@apollo/client';

import type {
  FindLatestReviewsInput,
  FindLatestReviewsResponse,
} from '../../../../../graphql/Review/types';

import { FIND_LATEST_REVIEWS } from '../../../../../graphql/Review';

import { useProfile } from '../../hooks/useProfile';

import ErrorText from '../../../../../components/ErrorText';

import LoadingSpinner from '../../../../../components/LoadingSpinner';

import ReviewPreview from '../../../../../components/reviews/Preview';

const RecentReviews: React.FC = () => {
  const { user } = useProfile();

  const { data, loading, error } = useQuery<
    FindLatestReviewsResponse,
    FindLatestReviewsInput
  >(FIND_LATEST_REVIEWS, {
    variables: { userId: user.id },
  });

  if (loading) {
    return <LoadingSpinner center />;
  }

  if (error) {
    return <ErrorText text={error.message} />;
  }

  return (
    <ul>
      {data.latestReviews.map(review => (
        <ReviewPreview key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default RecentReviews;
