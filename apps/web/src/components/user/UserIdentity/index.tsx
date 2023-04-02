import { Typography, ProfilePicture } from '@/components';

import UserProfileLink from '@/components/user/UserProfileLink';

interface Props {
  username: string;
  profilePictureUrl?: string;
}

export const UserIdentity: React.FC<Props> = props => {
  const { username, profilePictureUrl } = props;

  return (
    <UserProfileLink
      className="flex items-center gap-2 group mt-2"
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
