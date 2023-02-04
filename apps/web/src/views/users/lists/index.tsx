import type { FindUserQuery, FindUserListsQuery } from '../../../graphql';

import ListItem from '../../../components/ListItem';
import Typography from '../../../components/Typography';
import ListPreview from '../../../components/list/ListPreview';

import UserProfilePageView from '../components/UserProfilePageView';

import SortButtons from './components/SortButtons';

type UserListsViewProps = FindUserQuery & FindUserListsQuery;

const UserListsView: React.FC<UserListsViewProps> = ({ user, userLists }) => {
  const hasAnyList = userLists.length > 0;

  return (
    <UserProfilePageView
      title="Lists"
      user={user}
      sortButtons={<SortButtons />}
    >
      {!hasAnyList ? (
        <Typography className="text-center" component="h1">
          No lists have been made yet.
        </Typography>
      ) : (
        <ul>
          {userLists.map(list => (
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
