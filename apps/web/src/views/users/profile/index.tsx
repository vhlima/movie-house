import { useMemo } from 'react';

import type { FindUserQuery } from '../../../graphql';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Biography from './components/Biography';
import PinnedReviews from './components/PinnedReviews';
import RecentReviews from './components/RecentReviews';
import FavoriteMovies from './components/FavoriteMovies';
import PopularReviews from './components/PopularReviews';

import UserProfilePageView from '../components/UserProfilePageView';

type UserProfilePageViewProps = FindUserQuery;

const UserProfileView: React.FC<UserProfilePageViewProps> = ({ user }) => {
  const contextProvider = useMemo(
    () => ({ user } as ProfileContextData),
    [user],
  );

  return (
    <UserProfilePageView user={user}>
      <ProfileContext.Provider value={contextProvider}>
        <Biography />

        <FavoriteMovies />

        <PinnedReviews />

        <RecentReviews />

        <PopularReviews />
      </ProfileContext.Provider>
    </UserProfilePageView>
  );
};

export default UserProfileView;
