import React, { PropsWithChildren, ReactNode } from 'react';

import { UserData } from '../../../../types';

import { useAuth } from '../../../../hooks/useAuth';

import Link from '../../../../components/Link';

import UserProfilePicture from '../ProfilePicture';

import TextShorter from '../../../../components/TextShorter';

import LikeAndComment from '../../../../components/LikeAndComment';

export interface InteractionProps {
  text: string;
  textShort?: boolean;
}

interface InteractionInternalProps extends InteractionProps {
  // user: UserData;
  header?: ReactNode;
}

/*
  An interaction is an abstract component to handle Movie Review, Movie List and Commentary
*/

const Interaction: React.FC<PropsWithChildren<InteractionInternalProps>> = ({
  text,
  textShort,
  header,
  children,
}) => {
  const { user } = useAuth();

  if (!user) return <h1>user not found</h1>;

  return (
    <div className="flex flex-col gap-2 text-grey-200">
      <div className="flex items-center gap-1">
        <UserProfilePicture imageSize="sm" src={user.profilePicture} />

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
};

export default Interaction;
