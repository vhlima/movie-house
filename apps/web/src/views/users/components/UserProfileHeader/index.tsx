import type { PropsWithChildren } from 'react';

import Typography from '../../../../components/Typography';
import PageContent from '../../../../components/PageContent';
import BackdropImage from '../../../../components/BackdropImage';
import ProfilePicture from '../../../../components/ProfilePicture';

import UserProfileNavigation from './components/UserProfileNavigation';
import UserProfileStats from './components/UserProfileStats';

interface UserProfileHeaderProps {
  user: {
    id: string;
    username: string;
    profilePictureUrl?: string;
  };
}

const UserProfileHeader: React.FC<
  PropsWithChildren<UserProfileHeaderProps>
> = ({ user, children }) => {
  const { username, profilePictureUrl } = user;

  return (
    <BackdropImage
      src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg"
      alt="User profile backdrop"
    >
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

        <UserProfileStats user={user} />

        <UserProfileNavigation user={user} />

        {children}
      </PageContent>
    </BackdropImage>
  );
};

export default UserProfileHeader;
