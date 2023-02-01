import { useFindUserListsQuery } from '../../../graphql';

import type { FindUserQuery } from '../../../graphql';

import ListItem from '../../../components/ListItem';
import Typography from '../../../components/Typography';
import ListPreview from '../../../components/list/ListPreview';

import UserProfileHeader from '../components/UserProfileHeader';

type UserListsViewProps = FindUserQuery;

const UserListsView: React.FC<UserListsViewProps> = ({ user }) => {
  const { data: userListsData } = useFindUserListsQuery({
    variables: {
      userId: user.id,
    },
  });

  const hasAnyList = userListsData && userListsData.userLists.length > 0;

  return (
    <UserProfileHeader user={user}>
      <div className="flex items-center gap-2 border-b border-b-grey-800">
        <Typography className="uppercase" component="h1" size="sm">
          Lists
        </Typography>
      </div>

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
    </UserProfileHeader>
  );
};

export default UserListsView;
