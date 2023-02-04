import type { FindUserQuery } from '../../../graphql';

import UserProfilePageView from '../components/UserProfilePageView';

import DiaryTable from './components/DiaryTable';

type UserDiariesViewProps = FindUserQuery;

const UserDiariesView: React.FC<UserDiariesViewProps> = ({ user }) => {
  const { username } = user;

  return (
    <UserProfilePageView title={`${username}'s diary`} user={user}>
      <DiaryTable />
    </UserProfilePageView>
  );
};

export default UserDiariesView;
