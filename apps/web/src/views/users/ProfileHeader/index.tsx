import React, { PropsWithChildren } from 'react';

import Image from 'next/image';

import { useRouter } from 'next/router';

import { UserData } from '../../../types';

import UserProfilePicture from '../components/ProfilePicture';

import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/useAuth';
import UserProfileNumber from './components/UserProfileNumber';
import BackgroundImage from '../../movies/components/BackgroundImage';

interface ProfileHeaderProps {
  user: UserData;
}

const ProfileHeader: React.FC<PropsWithChildren<ProfileHeaderProps>> = ({
  user,
  children,
}) => {
  // TODO change that
  const { push } = useRouter();

  const { user: currentUser, followUser, unfollowUser } = useAuth();

  const isOwnProfile = currentUser && currentUser._id === user._id;

  const isFollowing = currentUser && currentUser.following.includes(user._id);

  return (
    <div className="flex">
      <BackgroundImage src="https://a.ltrbxd.com/resized/sm/upload/cb/ch/lf/md/oslo-august-31-1200-1200-675-675-crop-000000.jpg" />

      <div className="flex flex-col gap-4 px-3 mt-32 z-10">
        <div className="flex items-center gap-2">
          <UserProfilePicture imageSize="lg" src={user.profilePicture} />

          <div className="flex flex-grow flex-wrap items-center gap-x-2">
            <h1 className="text-grey-100 text-2xl font-semibold">
              {user.username}
            </h1>

            <div className="bg-movieHouse-mid rounded-md px-1">
              <span className="text-white text-sm">Patron</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          {!isOwnProfile ? (
            <>
              <Button
                buttonStyle="secondary"
                buttonSize="xs"
                onClick={() =>
                  !isFollowing ? followUser(user._id) : unfollowUser(user._id)
                }
              >
                {!isFollowing ? 'Follow' : 'Unfollow'}
              </Button>

              <Button buttonStyle="secondary" buttonSize="xs">
                Message
              </Button>
            </>
          ) : (
            <Button
              buttonStyle="secondary"
              buttonSize="xs"
              onClick={() => push('/settings')}
            >
              Profile settings
            </Button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <UserProfileNumber link={{ href: '/' }} number={1595} text="movies" />

          <UserProfileNumber
            link={{ href: '/' }}
            number={118}
            text="This year"
          />

          <UserProfileNumber link={{ href: '/' }} number={48} text="Lists" />

          <div className="flex">
            <UserProfileNumber
              link={{ href: '/' }}
              number={138}
              text="Following"
            />

            <UserProfileNumber
              link={{ href: '/' }}
              number={116943}
              text="Followers"
            />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default ProfileHeader;
