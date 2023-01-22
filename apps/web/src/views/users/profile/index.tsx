import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { useFindUserQuery } from '../../../graphql';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Card from '../../../components/Card';
import Typography from '../../../components/Typography';
import PageContent from '../../../components/PageContent';
import BackdropImage from '../../../components/BackdropImage';
import ProfilePicture from '../../../components/ProfilePicture';

import FavoriteMovies from './components/FavoriteMovies';

import ProfileStats from './components/ProfileStats';

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

  const { username, biography, profilePictureUrl } = data.user;

  return (
    <BackdropImage src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg">
      <PageContent className="relative flex flex-col justify-center gap-8 w-full">
        <div className="flex items-center gap-2">
          <ProfilePicture imageSize="lg" src={profilePictureUrl} />

          <div className="flex flex-grow flex-wrap items-center gap-x-2">
            <Typography
              className="font-bold"
              component="h1"
              color="primary"
              size="2xl"
            >
              {username}
            </Typography>

            <div className="bg-movieHouse-mid rounded-md px-2">
              <span className="text-white text-sm">Patron</span>
            </div>
          </div>
        </div>

        <ProfileContext.Provider value={contextProvider}>
          <ProfileStats />

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
      </PageContent>
    </BackdropImage>
  );
};

export default UserProfileView;
