import { useFindUserListsNamesQuery } from '@/gql';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components';

import QueryState from '../../../../../../QueryState';

interface UserListsProps {
  filter?: string;
  onClick: (listId: string) => void;
}

const UserLists: React.FC<UserListsProps> = ({ filter, onClick }) => {
  const { data: session } = useAuth();

  const { data, loading, error } = useFindUserListsNamesQuery({
    variables: { userId: session.user.id },
  });

  if (!data) {
    return <QueryState loading={loading} error={error} />;
  }

  const listsToDisplay = !filter
    ? data.userListNames
    : data.userListNames.filter(ul => ul.name.includes(filter));

  return (
    <ul className="overflow-y-auto max-h-96">
      {listsToDisplay.map(({ id, name }) => (
        <li key={`user-list-${id}`}>
          <Button
            className="pl-2 px-0 font-normal"
            intent="tertiary"
            rounded={false}
            center={false}
            onClick={() => onClick(id)}
          >
            {name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default UserLists;
