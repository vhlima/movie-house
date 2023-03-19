import type { FindUserQuery, FindReviewsQuery } from '@/graphql';

import { ReviewList } from '@/components/review/ReviewList';

import UserProfilePageView from '../components/UserProfilePageView';

import ReviewsSortButtons from './components/ReviewsSortButtons';

type UserReviewsViewProps = FindUserQuery & FindReviewsQuery;

const UserReviewsView: React.FC<UserReviewsViewProps> = ({ user, reviews }) => {
  const reviewCount = reviews.totalCount;

  return (
    <UserProfilePageView
      user={user}
      title={`${user.username} reviewed ${reviewCount} ${
        reviewCount === 1 ? 'movie' : 'movies'
      }`}
      sortButtons={<ReviewsSortButtons user={user} />}
    >
      <ReviewList
        intent="profile"
        reviews={reviews.edges.map(edge => edge.node)}
        emptyMessage="No reviews made yet."
      />
    </UserProfilePageView>
  );
};

export default UserReviewsView;
