import type { UserListsPageProps } from '../../../pages/users/[username]/lists';

import { useAuth } from '../../../hooks/useAuth';

import Link from '../../../components/Link';

import Typography from '../../../components/Typography';

import PageContent from '../../../components/PageContent';

import ProfilePicture from '../../../components/ProfilePicture';

import UserListMoviesCard from './components/UserList';

const UserListsView: React.FC<UserListsPageProps> = ({ user, lists }) => {
  const { data } = useAuth();

  return (
    <PageContent className="my-3">
      <Link
        className="flex gap-2"
        href={{
          href: '/users/[username]',
          query: { username: user.username },
        }}
      >
        <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

        <Typography className="font-semibold" component="span" color="primary">
          {user.username}
        </Typography>
      </Link>

      <div className="mt-2">
        <Typography
          className="uppercase mb-2 border-b border-b-grey-300"
          component="h1"
          color="primary"
        >
          Lists
        </Typography>

        <ul>
          {lists
            .filter(list =>
              !data || data.user.id !== user.id
                ? list?.isPrivate || true
                : true,
            )
            .map(list => (
              <UserListMoviesCard key={list.id} user={user} list={list} />
            ))}
        </ul>
      </div>
    </PageContent>
  );
};

export default UserListsView;
