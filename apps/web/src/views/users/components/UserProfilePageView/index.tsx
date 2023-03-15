import { useMemo } from 'react';

import type { PropsWithChildren, ReactNode } from 'react';

import type { ProfileContextData } from '@/hooks/useProfile';

import { ProfileContext } from '@/hooks/useProfile';

import Typography from '../../../../components/Typography';
import SubHeading from '../../../../components/SubHeading';
import PageContent from '../../../../components/PageContent';
import BackdropImage from '../../../../components/BackdropImage';
import ProfilePicture from '../../../../components/ProfilePicture';

import ProfileStats from './components/ProfileStats';
import ProfileNavigation from './components/ProfileNavigation';

interface UserProfilePageViewProps {
  title?: string;
  marginBottom?: boolean;
  sortButtons?: ReactNode;

  user: {
    id: string;
    username: string;
    profilePictureUrl?: string;
  };
}

const UserProfilePageView: React.FC<
  PropsWithChildren<UserProfilePageViewProps>
> = ({ title, user, sortButtons, marginBottom = true, children }) => {
  const contextProvider = useMemo(
    () => ({ user } as ProfileContextData),
    [user],
  );

  return (
    <BackdropImage
      src="https://a.ltrbxd.com/resized/sm/upload/dr/yl/7v/w5/its-a-wonderful-life-1200-1200-675-675-crop-000000.jpg"
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

        <ProfileContext.Provider value={contextProvider}>
          <ProfileStats />

          <ProfileNavigation />

          {children && (title || sortButtons) ? (
            <div>
              <SubHeading title={title} marginBottom={marginBottom}>
                {sortButtons && (
                  <div className="flex ml-auto">{sortButtons}</div>
                )}
              </SubHeading>

              {children}
            </div>
          ) : (
            children
          )}
        </ProfileContext.Provider>
      </PageContent>
    </BackdropImage>
  );
};

export default UserProfilePageView;
