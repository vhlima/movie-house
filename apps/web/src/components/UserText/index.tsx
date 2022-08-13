import clsx from 'clsx';

import type { PropsWithChildren, ReactNode } from 'react';

import type { UserData } from '../../graphql/User/types';

import Link from '../Link';

import TextShorter from '../TextShorter';

import ProfilePicture from '../ProfilePicture';

interface UserTextProps {
  text: string;
  textShort?: boolean;
}

interface UserTextInternalProps extends UserTextProps {
  className?: string;
  user: UserData;
  text: string;
  textShort?: boolean;
  preHeader?: ReactNode;
  header?: ReactNode;
}

/*
  A user text is an abstract component to handle Movie Review, Movie List and Commentary
*/

// TODO change that user text short

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
      <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

      {preHeader}

      <Link
        className="group"
        href={{
          pathname: '/users/[id]',
          query: { id: user.id },
        }}
      >
        <span className="text-gray-100 font-semibold group-hover:text-grey-200">
          {user.username}
        </span>
      </Link>

      {header}
    </div>

    {!textShort || text.length <= 120 ? (
      <p>{text}</p>
    ) : (
      <TextShorter maxCharacters={120} text={text} />
    )}

    {children}
  </div>
);

export default UserText;
