import type { FindUserQuery } from '../../../graphql';

import { useFindUserReviewsQuery } from '../../../graphql';

import Typography from '../../../components/Typography';

import ReviewPreview from '../../../components/review/ReviewPreview';

import UserProfilePageView from '../components/UserProfilePageView';
import ReviewsSortButtons from './components/ReviewsSortButtons';

type UserReviewsViewProps = FindUserQuery;

const UserReviewsView: React.FC<UserReviewsViewProps> = ({ user }) => {
  const { data: reviewsData } = useFindUserReviewsQuery({
    variables: { userId: user.id },
  });

  const reviewCount = reviewsData ? reviewsData.reviewsUser.length : 0;

  return (
    <UserProfilePageView
      user={user}
      title={`${user.username} reviewed ${reviewCount} ${
        reviewCount === 1 ? 'movie' : 'movies'
      }`}
      sortButtons={<ReviewsSortButtons user={user} />}
    >
      {!reviewsData || reviewsData.reviewsUser.length === 0 ? (
        <Typography className="text-center" component="h1">
          No reviews made yet.
        </Typography>
      ) : (
        <ul>
          {reviewsData.reviewsUser.map(review => (
            <ReviewPreview key={`user-reviews-${review.id}`} review={review} />
          ))}
        </ul>
      )}
    </UserProfilePageView>
  );
};

export default UserReviewsView;
