import Button from '../../../../../../../../components/Button';

import QueryState from '../../../../../../../../components/QueryState';

import { useFindUserListsCustomQuery } from '../../../../../../../../graphql';

import { useAuth } from '../../../../../../../../hooks/useAuth';

interface UserListsProps {
  searchParams?: string;
  onClick: (listId: string) => void;
}

const UserLists: React.FC<UserListsProps> = ({ searchParams, onClick }) => {
  const { user } = useAuth();

  const { data, loading, error } = useFindUserListsCustomQuery({
    variables: { userId: user.id },
  });

  return (
    <QueryState loading={loading} error={error}>
      {data && data.userListsCustom.length > 0 && (
        <ul className="overflow-y-auto max-h-96">
          {(!searchParams
            ? data.userListsCustom
            : data.userListsCustom.filter(ul => ul.name.includes(searchParams))
          ).map(userList => (
            <li key={userList.id}>
              <Button
                className="p-2 text-left"
                buttonStyle="tertiary"
                buttonSize="none"
                rounded={false}
                flex={false}
                border={false}
                onClick={() => onClick(userList.id)}
              >
                {userList.name}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </QueryState>
  );
};

export default UserLists;
