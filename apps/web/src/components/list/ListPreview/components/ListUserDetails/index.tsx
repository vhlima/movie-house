import { Typography, ProfilePicture } from '@/components';

import UserProfileLink from '@/components/user/UserProfileLink';

interface Props {
  username: string;
  profilePictureUrl?: string;
}

export const ListUserDetails: React.FC<Props> = props => {
  const { username, profilePictureUrl } = props;

  return (
    <UserProfileLink
      className="flex items-center gap-2 group mt-2"
      username={username}
      data-testid="list-user-info"
    >
      <ProfilePicture
        src={profilePictureUrl}
        imageSize="sm"
        data-testid="list-user-profile-picture"
      />

      <Typography
        className="font-bold"
        component="span"
        groupHover
        data-testid="list-user-username"
      >
        {username}
      </Typography>
    </UserProfileLink>
  );
};
