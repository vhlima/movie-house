import clsx from 'clsx';

import type { PropsWithChildren } from 'react';

import { Link } from '@/components';

interface UserProfileLinkProps {
  className?: string;
  username: string;
}

const UserProfileLink: React.FC<PropsWithChildren<UserProfileLinkProps>> = ({
  className,
  username,
  children,
}) => (
  <Link
    className={clsx(className && className)}
    href={{
      pathname: '/users/[username]',
      query: { username },
    }}
  >
    {children}
  </Link>
);

export default UserProfileLink;
