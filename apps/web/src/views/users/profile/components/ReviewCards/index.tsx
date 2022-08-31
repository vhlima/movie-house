import { useCallback } from 'react';

import { useQuery } from '@apollo/client';

import type { ReviewData } from '../../../../../graphql/Review/types';

import type {
  FindFeaturedReviewsInput,
  FindFeaturedReviewsResponse,
} from '../../../../../graphql/FeaturedReviews/types';

import { FIND_FEATURED_REVIEWS } from '../../../../../graphql/FeaturedReviews';

import { useProfile } from '../../hooks/useProfile';

import Card from '../../../../../components/Card';

import LoadingSpinner from '../../../../../components/LoadingSpinner';

import ReviewPreview from '../../../../../components/reviews/Preview';
import ErrorText from '../../../../../components/ErrorText';

const ReviewSection: React.FC = () => {
  const { user } = useProfile();

  const { data, loading, error } = useQuery<
    FindFeaturedReviewsResponse,
    FindFeaturedReviewsInput
  >(FIND_FEATURED_REVIEWS, { variables: { userId: user.id } });

  const buildReviewList = useCallback(
    (title: string, reviews?: ReviewData[]) => {
      if (loading) {
        return (
          <Card title={title} noPadding>
            <LoadingSpinner center />
          </Card>
        );
      }

      if (error) {
        return (
          <Card title={title} noPadding>
            <ErrorText text={`Error loading ${title} ${error}`} />
          </Card>
        );
      }

      return (
        <Card title={title} noPadding>
          {reviews && (
            <ul>
              {reviews.map(review => (
                <ReviewPreview key={review.id} review={review} />
              ))}
            </ul>
          )}
        </Card>
      );
    },
    [error, loading],
  );

  return (
    <>
      {buildReviewList('Pinned reviews', data?.featuredReviews?.pinnedReviews)}

      {buildReviewList('Recent reviews', data?.featuredReviews?.recentReviews)}

      {buildReviewList(
        'Popular reviews',
        data?.featuredReviews?.popularReviews,
      )}
    </>
  );
};

export default ReviewSection;
