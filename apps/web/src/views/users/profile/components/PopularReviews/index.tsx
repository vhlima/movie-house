import { ReviewSortType, useFindReviewsQuery } from '@/gql';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Card } from '@/components';

import { ReviewList } from '@/components/review/ReviewList';

export const PopularReviews: React.FC = () => {
  const { user } = useProfile();

  const { data: userPopularReviewsData } = useFindReviewsQuery({
    variables: {
      userId: user.id,
      page: 1,
      sort: {
        type: ReviewSortType.Popular,
      },
    },
  });

  return (
    <Card>
      <Card.Header title="Popular reviews" marginBottom />

      <Card.Body>
        <ReviewList
          showUser={false}
          reviews={
            userPopularReviewsData
              ? userPopularReviewsData.reviews.edges.map(edge => edge.node)
              : []
          }
          emptyMessage={`${user.username} hasnt reviewed any movies yet.`}
        />
      </Card.Body>
    </Card>
  );
};
