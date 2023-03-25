import type { FindUserQuery, FindListsQuery } from '@/graphql';

import { Typography } from '@/components';

import ListPreview from '../../../components/list/ListPreview';

import UserProfilePageView from '../components/UserProfilePageView';

import SortButtons from './components/SortButtons';

type UserListsViewProps = FindUserQuery & FindListsQuery;

const UserListsView: React.FC<UserListsViewProps> = ({ user, lists }) => {
  const hasAnyList = lists.edges.length > 0;

  return (
    <UserProfilePageView
      title="Lists"
      user={user}
      sortButtons={<SortButtons />}
    >
      {!hasAnyList ? (
        <Typography component="h1">No lists have been made yet.</Typography>
      ) : (
        <ul>
          {lists.edges.map(({ node }) => (
            <ListPreview
              key={`user-list-${node.name}`}
              list={node}
              showUser={false}
            />
          ))}
        </ul>
      )}
    </UserProfilePageView>
  );
};

export default UserListsView;
