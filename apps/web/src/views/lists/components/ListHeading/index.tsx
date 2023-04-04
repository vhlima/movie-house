import { Typography, ProfilePicture, SubHeading } from '@/components';

import { DecadeDropdown, GenreDropdown, SortButton } from '@/components/Sort';

import { SingleDropdown } from '@/hooks/useSingleDropdown';

import UserProfileLink from '@/components/user/UserProfileLink';

interface Props {
  listId: string;
  user: {
    username: string;
    profilePictureUrl?: string;
  };
}

export const ListHeading: React.FC<Props> = ({ listId, user }) => {
  const rootPath = `/lists/${listId}`;

  return (
    <SubHeading className="flex-col sm:flex-row">
      <UserProfileLink
        className="flex items-center group"
        username={user.username}
      >
        <ProfilePicture src={user.profilePictureUrl} imageSize="sm" />

        <Typography className="ml-2" component="span" groupHover>
          List by&nbsp;
          <Typography component="strong" color="primary" groupHover>
            {user.username}
          </Typography>
        </Typography>
      </UserProfileLink>

      <div className="flex flex-col items-center gap-2 flex-wrap sm:gap-0 sm:flex-nowrap sm:flex-row sm:w-fit sm:ml-auto">
        <SingleDropdown>
          <SortButton type="decade" intent="secondary">
            <DecadeDropdown pathname={rootPath} />
          </SortButton>

          <SortButton type="genre" intent="secondary">
            <GenreDropdown pathname={rootPath} />
          </SortButton>
        </SingleDropdown>
      </div>
    </SubHeading>
  );
};
