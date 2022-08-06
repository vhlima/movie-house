import clsx from 'clsx';

import type { PropsWithChildren, ReactNode } from 'react';

import type { UserResponse } from '../../types/user';

import Link from '../Link';

import TextShorter from '../TextShorter';

import UserProfilePicture from '../../views/users/components/ProfilePicture';

interface UserTextProps {
  text: string;
  textShort?: boolean;
}

interface UserTextInternalProps extends UserTextProps {
  className?: string;
  user: Pick<UserResponse, '_id' | 'profilePicture' | 'username'>;
  text: string;
  textShort?: boolean;
  preHeader?: ReactNode;
  header?: ReactNode;
}

/*
  A user text is an abstract component to handle Movie Review, Movie List and Commentary
*/

const UserText: React.FC<PropsWithChildren<UserTextInternalProps>> = ({
  className,
  user,
  text,
  textShort,
  preHeader,
  header,
  children,
}) => (
  <div
    className={clsx(
      'flex flex-col gap-2 text-grey-200',
      className && className,
    )}
  >
    <div className="flex items-center gap-1">
      <UserProfilePicture imageSize="sm" src={user.profilePicture} />

      {preHeader}

      <Link
        className="group"
        href={{
          pathname: '/users/[id]',
          query: { id: user._id },
        }}
      >
        <span className="text-gray-100 font-semibold group-hover:text-grey-200">
          {user.username}
        </span>
      </Link>

      {header}
    </div>

    {!textShort ? (
      <p>{text}</p>
    ) : (
      <TextShorter maxCharacters={120} text={text} />
    )}

    {children}
  </div>
);

export default UserText;
