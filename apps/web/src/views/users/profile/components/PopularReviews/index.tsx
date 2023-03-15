import { ReviewSortType, useFindReviewsQuery } from '@/graphql';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Typography } from '@/components';
import Card from '../../../../../components/Card';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

const PopularReviews: React.FC = () => {
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

  const hasAnyReview =
    userPopularReviewsData && userPopularReviewsData.reviews.totalCount > 0;

  return (
    <Card>
      <Card.Header title="Popular reviews" marginBottom />

      <Card.Body>
        {!hasAnyReview ? (
          <Typography component="p">
            {user.username} hasnt reviewed any movies yet.
          </Typography>
        ) : (
          <ul>
            {userPopularReviewsData.reviews.edges.map(edge => (
              <ReviewPreview
                key={`popular-review-${edge.node.id}`}
                review={edge.node}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default PopularReviews;
