import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Card } from '@/components';

import { ReviewList } from '@/components/review/ReviewList';

export const RecentReviews: React.FC = () => {
  const { user } = useProfile();

  const { data: userRecentReviewsData } = useFindReviewsQuery({
    variables: {
      userId: user.id,
      page: 1,
      sort: {
        type: ReviewSortType.Recent,
      },
    },
  });

  return (
    <Card>
      <Card.Header title="Recent reviews" marginBottom />

      <Card.Body>
        <ReviewList
          intent="profile"
          reviews={
            userRecentReviewsData
              ? userRecentReviewsData.reviews.edges.map(edge => edge.node)
              : []
          }
          emptyMessage={`${user.username} hasnt reviewed any movies yet.`}
        />
      </Card.Body>
    </Card>
  );
};
