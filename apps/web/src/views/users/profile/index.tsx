import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useFindUserQuery } from '../../../graphql';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Card from '../../../components/Card';
import Typography from '../../../components/Typography';

import UserProfileHeader from '../components/UserProfileHeader';

import FavoriteMovies from './components/FavoriteMovies';
import PinnedReviews from './components/PinnedReviews';
import RecentReviews from './components/RecentReviews';
import PopularReviews from './components/PopularReviews';

const UserProfileView: React.FC = () => {
  const { query } = useRouter();

  const { data } = useFindUserQuery({
    variables: { username: query.username as string },
  });

  const contextProvider = useMemo(
    () => ({ user: data?.user } as ProfileContextData),
    [data],
  );

  if (!data) {
    return null;
  }

  const { username, biography } = data.user;

  return (
    <UserProfileHeader user={data.user}>
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
    </UserProfileHeader>
  );
};

export default UserProfileView;
