import type { PropsWithChildren, ReactNode } from 'react';

import clsx from 'clsx';

import { useAuth } from '../../../../hooks/useAuth';

import TextShorter from '../../../../components/TextShorter';

import ProfilePicture from '../../../../components/ProfilePicture';

// TODO check if that is being used
export interface InteractionProps {
  text: string;
  textShort?: boolean;
}

interface InteractionInternalProps extends InteractionProps {
  className?: string;
  header?: ReactNode;
}

/*
  An interaction is an abstract component to handle Movie Review, Movie List and Commentary
*/

const Interaction: React.FC<PropsWithChildren<InteractionInternalProps>> = ({
  className,
  text,
  textShort,
  header,
  children,
}) => {
  const { user } = useAuth();

  if (!user) return <h1>user not found</h1>;

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 text-grey-200',
        className && className,
      )}
    >
      <div className="flex items-center gap-1">
        <ProfilePicture imageSize="sm" src={user.profilePicture} />

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
