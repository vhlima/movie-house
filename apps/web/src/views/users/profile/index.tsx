import { useMemo } from 'react';

import { useRouter } from 'next/router';

import type { FindUserQuery } from '../../../graphql';

import { useFindUserQuery } from '../../../graphql';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Card from '../../../components/Card';
import Typography from '../../../components/Typography';

import FavoriteMovies from './components/FavoriteMovies';
import PinnedReviews from './components/PinnedReviews';
import RecentReviews from './components/RecentReviews';
import PopularReviews from './components/PopularReviews';

import UserProfilePageView from '../components/UserProfilePageView';

type UserProfilePageViewProps = FindUserQuery;

const UserProfileView: React.FC<UserProfilePageViewProps> = ({ user }) => {
  const contextProvider = useMemo(
    () => ({ user } as ProfileContextData),
    [user],
  );

  const { username, biography } = user;

  return (
    <UserProfilePageView user={user}>
      <ProfileContext.Provider value={contextProvider}>
        <Card title="About me" noPadding>
          {!biography ? (
            <Typography component="p">
              {username} hasn&apos;t told us anything about him yet.
            </Typography>
          ) : (
            <Typography className="whitespace-pre-wrap" component="p">
              {biography}
            </Typography>
          )}
        </Card>

        <FavoriteMovies />

        <PinnedReviews />

        <RecentReviews />

        <PopularReviews />
      </ProfileContext.Provider>
    </UserProfilePageView>
  );
};

export default UserProfileView;
