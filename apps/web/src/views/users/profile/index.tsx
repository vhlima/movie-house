import type { FindUserQuery } from '@/graphql';

import {
  Biography,
  PinnedReviews,
  RecentReviews,
  FavoriteMovies,
  PopularReviews,
} from './components';

import UserProfilePageView from '../components/UserProfilePageView';

type UserProfilePageViewProps = FindUserQuery;

const UserProfileView: React.FC<UserProfilePageViewProps> = ({ user }) => (
  <UserProfilePageView user={user}>
    <Biography />

    <FavoriteMovies />

    <PinnedReviews />

    <RecentReviews />

    <PopularReviews />
  </UserProfilePageView>
);

export default UserProfileView;
