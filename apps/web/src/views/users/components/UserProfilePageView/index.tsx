import type { PropsWithChildren, ReactNode } from 'react';

import Typography from '../../../../components/Typography';
import PageContent from '../../../../components/PageContent';
import BackdropImage from '../../../../components/BackdropImage';
import ProfilePicture from '../../../../components/ProfilePicture';

import ProfileStats from './components/ProfileStats';
import ProfileNavigation from './components/ProfileNavigation';

interface UserProfilePageViewProps {
  title?: string;
  sortButtons?: ReactNode;

  user: {
    id: string;
    username: string;
    profilePictureUrl?: string;
  };
}

const UserProfilePageView: React.FC<
  PropsWithChildren<UserProfilePageViewProps>
> = ({ title, user, sortButtons, children }) => {
  const a = 1;

  return (
    <BackdropImage
      src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg"
      alt="User profile backdrop"
    >
      <PageContent className="relative flex flex-col justify-center gap-8 w-full">
        <div className="flex items-center gap-2">
          <ProfilePicture imageSize="lg" src={user.profilePictureUrl} />

          <div className="flex flex-grow flex-wrap items-center gap-x-2">
            <Typography
              className="font-bold"
              component="h1"
              color="primary"
              size="2xl"
            >
              {user.username}
            </Typography>

            <div className="bg-movieHouse-mid rounded-md px-2">
              <span className="text-white text-sm">Patron</span>
            </div>
          </div>
        </div>

        <ProfileStats user={user} />

        <ProfileNavigation user={user} />

        {(title || sortButtons) && (
          <div className="flex items-center gap-2 border-b border-b-grey-800">
            {title && (
              <Typography className="uppercase" component="h1" size="sm">
                {title}
              </Typography>
            )}

            {sortButtons && <div className="flex ml-auto">{sortButtons}</div>}
          </div>
        )}

        {children}
      </PageContent>
    </BackdropImage>
  );
};

export default UserProfilePageView;
