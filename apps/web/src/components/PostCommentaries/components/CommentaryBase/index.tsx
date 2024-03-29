import clsx from 'clsx';

import type { PropsWithChildren, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';

import {
  Typography,
  Button,
  ProfilePicture,
  SvgIcon,
  TextShorter,
  LikeButton,
} from '@/components';

import { formatDateDistanceFromMillis } from '@/utils/date-utils';

import UserProfileLink from '@/components/user/UserProfileLink';
import { LikeType } from '@/gql';

interface CommentaryBaseProps {
  id: string;
  content: string;
  createdAt: number;
  user: {
    username: string;
    profilePictureUrl?: string;
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
  const { user, content, createdAt } = base;

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
          {formatDateDistanceFromMillis(createdAt)}
        </Typography>
      </div>

      <TextShorter className="my-2" maxCharacters={250} text={content} />

      <div className="flex gap-2">
        <LikeButton
          contentId={base.id}
          likeType={!isReply ? LikeType.Commentary : LikeType.Reply}
        />

        {buttons && buttons}

        {session && session.user.username === base.user.username && (
          <Button
            className="ml-auto"
            intent="danger"
            size="sm"
            full={false}
            onClick={onClickDelete}
          >
            <SvgIcon className="text-inherit" iconType="FiX" />
          </Button>
        )}
      </div>

      {children}
    </li>
  );
};

export default CommentaryBase;
