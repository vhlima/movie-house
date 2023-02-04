import type { FindUserQuery, FindUserReviewsQuery } from '../../../graphql';

import Typography from '../../../components/Typography';

import ReviewPreview from '../../../components/review/ReviewPreview';

import UserProfilePageView from '../components/UserProfilePageView';

import ReviewsSortButtons from './components/ReviewsSortButtons';

type UserReviewsViewProps = FindUserQuery & FindUserReviewsQuery;

const UserReviewsView: React.FC<UserReviewsViewProps> = ({
  user,
  reviewsUser,
}) => {
  const reviewCount = reviewsUser.length;

  const hasAnyReview = reviewCount > 0;

  return (
    <UserProfilePageView
      user={user}
      title={`${user.username} reviewed ${reviewCount} ${
        reviewCount === 1 ? 'movie' : 'movies'
      }`}
      sortButtons={<ReviewsSortButtons user={user} />}
    >
      {!hasAnyReview ? (
        <Typography className="text-center" component="h1">
          No reviews made yet.
        </Typography>
      ) : (
        <ul>
          {reviewsUser.map(review => (
            <ReviewPreview key={`user-reviews-${review.id}`} review={review} />
          ))}
        </ul>
      )}
    </UserProfilePageView>
  );
};

export default UserReviewsView;
