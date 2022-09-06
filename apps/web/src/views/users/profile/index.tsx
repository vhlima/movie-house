import { useMemo } from 'react';

import type { UserData } from '../../../graphql/User/types';

import type { ProfileContextData } from './hooks/useProfile';

import { ProfileContext } from './hooks/useProfile';

import Card from '../../../components/Card';

import FavoriteMovies from './components/FavoriteMovies';

import ProfileStats from './components/ProfileStats';

import ProfileButtons from './components/ProfileButtons';

import ProfilePicture from '../../../components/ProfilePicture';

import BackgroundImage from '../../../components/BackgroundImage';
import ReviewCards from './components/ReviewCards';

interface UserProfileViewProps {
  user: UserData;
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

          {/* <ProfileButtons /> */}

          <ProfileStats />

          <Card className="text-grey-200" title="About me" noPadding>
            {!user.biography ? (
              <p>{user.username} hasn&apos;t told us anything about him yet.</p>
            ) : (
              <p className="whitespace-pre-wrap">{user.biography}</p>
            )}
          </Card>

          <FavoriteMovies />

          <ReviewCards />
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export default UserProfileView;
