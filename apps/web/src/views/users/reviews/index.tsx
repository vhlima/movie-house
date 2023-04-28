import type { FindUserQuery, FindReviewsQuery } from '@/gql';

import { ReviewList } from '@/components/review/ReviewList';

import { Pagination } from '@/components';

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
        showUser={false}
        reviews={reviews.edges.map(edge => edge.node)}
        emptyMessage="No reviews made yet."
      />

      <Pagination
        className="mt-4"
        currentPage={reviews.pageInfo.currentPage}
        totalPages={reviews.totalPages}
      />
    </UserProfilePageView>
  );
};

export default UserReviewsView;
