import type { FindUserQuery, FindReviewsQuery } from '../../../graphql';

import Typography from '../../../components/Typography';

import ReviewPreview from '../../../components/review/ReviewPreview';

import UserProfilePageView from '../components/UserProfilePageView';

import ReviewsSortButtons from './components/ReviewsSortButtons';

type UserReviewsViewProps = FindUserQuery & FindReviewsQuery;

const UserReviewsView: React.FC<UserReviewsViewProps> = ({ user, reviews }) => {
  const reviewCount = reviews.totalCount;

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
        <Typography component="h1">No reviews made yet.</Typography>
      ) : (
        <ul>
          {reviews.edges.map(edge => (
            <ReviewPreview
              key={`user-reviews-${edge.node.id}`}
              review={edge.node}
            />
          ))}
        </ul>
      )}
    </UserProfilePageView>
  );
};

export default UserReviewsView;
