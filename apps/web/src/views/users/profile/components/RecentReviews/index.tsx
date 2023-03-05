import { ReviewSortType, useFindReviewsQuery } from '../../../../../graphql';

import { useProfile } from '../../../hooks/useProfile';

import Card from '../../../../../components/Card';
import Typography from '../../../../../components/Typography';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

const RecentReviews: React.FC = () => {
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

  const hasAnyRecentReview =
    userRecentReviewsData && userRecentReviewsData.reviews.totalCount > 0;

  return (
    <Card>
      <Card.Header title="Recent reviews" />

      <Card.Body>
        {!hasAnyRecentReview ? (
          <Typography component="p">
            {user.username} hasnt reviewed any movies yet.
          </Typography>
        ) : (
          <ul>
            {userRecentReviewsData.reviews.edges.map(edge => (
              <ReviewPreview
                key={`recent-review-${edge.node.id}`}
                review={edge.node}
              />
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecentReviews;
