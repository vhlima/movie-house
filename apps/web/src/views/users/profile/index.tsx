import type { FindUserQuery } from '../../../graphql';

import Biography from './components/Biography';
import PinnedReviews from './components/PinnedReviews';
import RecentReviews from './components/RecentReviews';
import FavoriteMovies from './components/FavoriteMovies';
import PopularReviews from './components/PopularReviews';

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
