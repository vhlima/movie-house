import clsx from 'clsx';

import type { PropsWithChildren, ReactNode } from 'react';

import type { Commentary } from '../../../../graphql';

import { formatDateDistance } from '../../../../utils';

import { useAuth } from '../../../../hooks/useAuth';

import Button from '../../../Button';
import SvgIcon from '../../../SvgIcon';
import LikeButton from '../../../LikeButton';
import Typography from '../../../Typography';
import TextShorter from '../../../TextShorter';
import ProfilePicture from '../../../ProfilePicture';

import UserProfileLink from '../../../user/UserProfileLink';

export interface CommentaryBaseProps {
  id: Commentary['id'];
  body: Commentary['body'];
  createdAt: Commentary['createdAt'];
  user: {
    id: Commentary['user']['id'];
    username: Commentary['user']['username'];
    profilePictureUrl?: Commentary['user']['profilePictureUrl'];
  };
}

interface CommentaryBaseInternalProps {
  isReply?: boolean;
  base: CommentaryBaseProps;
  buttons?: ReactNode;
  onClickDelete: () => void;
}

const CommentaryBase: React.FC<
  PropsWithChildren<CommentaryBaseInternalProps>
> = ({ isReply, base, buttons, children, onClickDelete }) => {
  const { user, body, createdAt } = base;

  const { data: session } = useAuth();

  return (
    <li
      className={clsx(
        'flex flex-col gap-2 py-4 border-b border-grey-700 last-of-type:border-b-0 last-of-type:pb-0',
        {
          'pr-0 pl-6': isReply,
        },
      )}
    >
      <div className="flex items-center gap-1">
        <ProfilePicture imageSize="sm" src={user.profilePictureUrl} />

        <UserProfileLink className="group" username={user.username}>
          <Typography
            className="font-bold group-hover:text-grey-200"
            component="span"
            color="primary"
          >
            {user.username}
          </Typography>
        </UserProfileLink>

        <Typography className="ml-auto" component="span" size="sm">
          {formatDateDistance(createdAt)}
        </Typography>
      </div>

      <TextShorter className="my-2" maxCharacters={250} text={body} />

      <div className="flex gap-2">
        <LikeButton rootId="" likeCount={0} />

        {buttons && buttons}

        {session && session.user.id === base.user.id && (
          <Button
            className="ml-auto"
            buttonStyle="danger"
            buttonSize="xs"
            full={false}
            onClick={onClickDelete}
          >
            <SvgIcon iconType="FiX" />
          </Button>
        )}
      </div>

      {children}
    </li>
  );
};

export default CommentaryBase;
