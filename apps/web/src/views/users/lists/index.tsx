import { useFindUserListsQuery } from '../../../graphql';

import type { FindUserQuery } from '../../../graphql';

import ListItem from '../../../components/ListItem';
import Typography from '../../../components/Typography';
import ListPreview from '../../../components/list/ListPreview';

import UserProfilePageView from '../components/UserProfilePageView';

type UserListsViewProps = FindUserQuery;

const UserListsView: React.FC<UserListsViewProps> = ({ user }) => {
  const { data: userListsData } = useFindUserListsQuery({
    variables: {
      userId: user.id,
    },
  });

  const hasAnyList = userListsData && userListsData.userLists.length > 0;

  return (
    <UserProfilePageView title="Lists" user={user}>
      {!hasAnyList ? (
        <Typography className="text-center" component="h1">
          No lists have been made yet.
        </Typography>
      ) : (
        <ul>
          {userListsData.userLists.map(list => (
            <ListItem key={`user-list-${list.name}`}>
              <ListPreview list={list} />
            </ListItem>
          ))}
        </ul>
      )}
    </UserProfilePageView>
  );
};

export default UserListsView;
