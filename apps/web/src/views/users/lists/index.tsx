import { useRouter } from 'next/router';

import { useFindUserListsQuery, useFindUserQuery } from '../../../graphql';

import { useAuth } from '../../../hooks/useAuth';

import ListItem from '../../../components/ListItem';
import Typography from '../../../components/Typography';
import PageContent from '../../../components/PageContent';
import ProfilePicture from '../../../components/ProfilePicture';
import UserProfileLink from '../../../components/user/UserProfileLink';

import ListPreview from '../../../components/list/ListPreview';

const UserListsView: React.FC = () => {
  const { data: session } = useAuth();

  const { query } = useRouter();

  const { data: userData } = useFindUserQuery({
    variables: { username: query.username as string },
  });

  const { data: userListsData } = useFindUserListsQuery({
    variables: {
      userId: userData?.user?.id,
    },
  });

  if (!userData || !userListsData) {
    return null;
  }

  const { user } = userData;

  const { userLists } = userListsData;

  return (
    <PageContent className="my-3">
      <UserProfileLink
        className="flex items-center gap-2"
        username={user.username}
      >
        <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

        <Typography className="font-bold" component="span" color="primary">
          {user.username}
        </Typography>
      </UserProfileLink>

      <div className="mt-2">
        <Typography
          className="uppercase font-bold mb-4 pb-2 border-b border-b-grey-300"
          component="h1"
          color="primary"
        >
          Lists
        </Typography>

        {userLists && userLists.length > 0 && (
          <ul>
            {userLists
              .filter(list =>
                !session || session.user.id !== user.id
                  ? list?.isPrivate || true
                  : true,
              )
              .map(list => (
                <ListItem key={`user-list-${list.name}`}>
                  <ListPreview list={list} />
                </ListItem>
              ))}
          </ul>
        )}
      </div>
    </PageContent>
  );
};

export default UserListsView;
