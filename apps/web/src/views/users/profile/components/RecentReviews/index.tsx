import { useFindUserRecentReviewsQuery } from '../../../../../graphql';

import { useProfile } from '../../hooks/useProfile';

import Card from '../../../../../components/Card';

import Typography from '../../../../../components/Typography';

import ReviewPreview from '../../../../../components/review/ReviewPreview';

const RecentReviews: React.FC = () => {
  const { user } = useProfile();

  const { data: userRecentReviewsData } = useFindUserRecentReviewsQuery({
    variables: { userId: user?.id },
  });

  return (
    <Card title="Recent reviews" noPadding>
      {!userRecentReviewsData ||
      userRecentReviewsData.reviewsUserRecent.length === 0 ? (
        <Typography component="p">
          {user.username} hasnt reviewed any movies yet
        </Typography>
      ) : (
        <ul>
          {userRecentReviewsData.reviewsUserRecent.map(review => (
            <ReviewPreview key={`recent-review-${review.id}`} review={review} />
          ))}
        </ul>
      )}
    </Card>
  );
};

export default RecentReviews;
