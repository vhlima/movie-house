import { Typography, ProfilePicture } from '@/components';

import UserProfileLink from '@/components/user/UserProfileLink';
import clsx from 'clsx';

interface Props {
  className?: string;
  username: string;
  profilePictureUrl?: string;
}

export const UserIdentity: React.FC<Props> = props => {
  const { className, username, profilePictureUrl } = props;

  return (
    <UserProfileLink
      className={clsx('flex items-center gap-2 group', className && className)}
      username={username}
      data-testid="user-identity"
    >
      <ProfilePicture src={profilePictureUrl} imageSize="sm" />

      <Typography
        className="font-bold"
        component="span"
        groupHover
        data-testid="user-identity-username"
      >
        {username}
      </Typography>
    </UserProfileLink>
  );
};
