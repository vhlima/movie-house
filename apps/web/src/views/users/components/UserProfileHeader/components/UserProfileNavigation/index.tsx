import clsx from 'clsx';

import { useRouter } from 'next/router';

import Link from '../../../../../../components/Link';
import Typography from '../../../../../../components/Typography';

interface UserProfileNavigationProps {
  user: {
    username: string;
  };
}

const navigationOptions = [
  {
    name: 'Profile',
    pathname: '/users/[username]',
  },
  {
    name: 'Films',
    pathname: '/users/[username]/films',
  },
  {
    name: 'Diary',
    pathname: '/users/[username]/diary',
  },
  {
    name: 'Reviews',
    pathname: '/users/[username]/reviews',
  },
  {
    name: 'Watchlist',
    pathname: '/users/[username]/watchlist',
  },
  {
    name: 'Lists',
    pathname: '/users/[username]/lists',
  },
];

const UserProfileNavigation: React.FC<UserProfileNavigationProps> = ({
  user,
}) => {
  const { username } = user;

  const { pathname } = useRouter();

  return (
    <nav className="rounded-sm border border-grey-800 overflow-hidden">
      <ul className="sm:flex">
        {navigationOptions.map(navigation => (
          <li
            className="group w-full h-full"
            key={`user-profile-navigation-${navigation.name}`}
          >
            <Link
              className={clsx('p-2 block text-center', {
                'border-b-2 border-b-movieHouse-mid':
                  pathname === navigation.pathname,
              })}
              href={{
                pathname: navigation.pathname,
                query: { username },
              }}
            >
              <Typography
                className={clsx({
                  'group-hover:text-grey-300': pathname !== navigation.pathname,
                })}
                component="span"
              >
                {navigation.name}
              </Typography>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserProfileNavigation;
