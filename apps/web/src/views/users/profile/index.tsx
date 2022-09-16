import { useMemo } from 'react';

import type { User } from '../../../graphql';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Card from '../../../components/Card';

import FavoriteMovies from './components/FavoriteMovies';

import ProfileStats from './components/ProfileStats';

import ProfilePicture from '../../../components/ProfilePicture';

import BackgroundImage from '../../../components/BackgroundImage';

import PinnedReviews from './components/Reviews/PinnedReviews';
import RecentReviews from './components/Reviews/RecentReviews';
import PopularReviews from './components/Reviews/PopularReviews';

interface UserProfileViewProps {
  user: User;
}

const UserProfileView: React.FC<UserProfileViewProps> = ({ user }) => {
  const contextProviderValue = useMemo(
    () => ({ user } as ProfileContextData),
    [user],
  );

  return (
    <ProfileContext.Provider value={contextProviderValue}>
      <div className="flex">
        <BackgroundImage src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg" />

        <div className="flex flex-col justify-center gap-4 w-full px-3 mt-32 z-10">
          <div className="flex items-center gap-2">
            <ProfilePicture imageSize="lg" src={user.profilePictureUrl} />

            <div className="flex flex-grow flex-wrap items-center gap-x-2">
              <h1 className="text-grey-100 text-2xl font-semibold">
                {user.username}
              </h1>

              <div className="bg-movieHouse-mid rounded-md px-1">
                <span className="text-white text-sm">Patron</span>
              </div>
            </div>
          </div>

          <ProfileStats />

          <Card className="text-grey-200" title="About me" noPadding>
            {!user.biography ? (
              <p>{user.username} hasn&apos;t told us anything about him yet.</p>
            ) : (
              <p className="whitespace-pre-wrap">{user.biography}</p>
            )}
          </Card>

          <FavoriteMovies />

          <PinnedReviews />

          <RecentReviews />

          <PopularReviews />
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default UserProfileView;
