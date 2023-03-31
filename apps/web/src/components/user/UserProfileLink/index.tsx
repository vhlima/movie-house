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
  ...props
}) => (
  <Link
    className={clsx(className && className)}
    href={{
      pathname: '/users/[username]',
      query: { username },
    }}
    {...props}
  >
    {children}
  </Link>
);

export default UserProfileLink;
