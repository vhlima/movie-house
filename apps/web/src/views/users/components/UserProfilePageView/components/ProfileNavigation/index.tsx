import clsx from 'clsx';

import { useRouter } from 'next/router';

import { useProfile } from '@/views/users/hooks/useProfile';

import { Typography } from '@/components';
import Link from '../../../../../../components/Link';

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

const ProfileNavigation: React.FC = () => {
  const { user } = useProfile();

  const { route } = useRouter();

  const rootPath = route.split('/').slice(0, 4).join('/');

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
                  rootPath === navigation.pathname,
              })}
              href={{
                pathname: navigation.pathname,
                query: { username: user.username },
              }}
            >
              <Typography
                className={clsx({
                  'group-hover:text-grey-300': rootPath !== navigation.pathname,
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

export default ProfileNavigation;
