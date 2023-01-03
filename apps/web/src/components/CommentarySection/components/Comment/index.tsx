import clsx from 'clsx';

import { formatDistance } from 'date-fns';

import type { PropsWithChildren } from 'react';

import { useAuth } from '../../../../hooks/useAuth';

import type { Commentary, Reply } from '../../../../graphql';

import Button from '../../../Button';

import SvgIcon from '../../../SvgIcon';

import UserText from '../../../UserText';

import LikeButton from '../../../LikeButton';

interface CommentHandles {
  onClickDelete: (commentId: string) => void;
  onClickReport: (commentId: string) => void;
  onClickReply?: (commentId: string) => void;
}

interface CommentProps extends CommentHandles {
  isReply?: boolean;
  comment: Commentary | Reply;
}

const Comment: React.FC<PropsWithChildren<CommentProps>> = ({
  isReply,
  comment,
  onClickReply,
  onClickReport,
  onClickDelete,
  children,
}) => {
  const { data } = useAuth();

  return (
    <div
      className={clsx('flex flex-col gap-2 p-3', {
        'border-b border-grey-700 last-of-type:border-b-0': !isReply,
        'pt-0 pr-0 pb-3 pl-6 last-of-type:pb-0': isReply,
      })}
    >
      <UserText
        header={
          <span className="text-grey-200 text-sm ml-auto">
            {formatDistance(Date.now(), new Date(`${comment.createdAt}`), {
              addSuffix: true,
            })}
          </span>
        }
        user={comment.user}
        text={comment.body}
        textShort
      />

      {data && (
        <div className="flex gap-2">
          <LikeButton
            rootId={comment.postId}
            referenceId={comment.id}
            likeCount={comment.likes.length}
            hasLiked={
              comment.likes.filter(usr => usr.id !== data.user.id).length > 0
            }
          />

          {onClickReply && (
            <Button
              className="uppercase"
              buttonStyle="tertiary"
              buttonSize="xs"
              full={false}
              onClick={() => onClickReply(comment.id)}
            >
              Reply
            </Button>
          )}

          {data.user.id !== comment.user.id ? (
            <Button
              className="ml-auto"
              buttonStyle="secondary"
              buttonSize="xs"
              full={false}
              onClick={() => onClickReport(comment.id)}
            >
              <SvgIcon className="text-grey-300" iconType="BsFlagFill" />
            </Button>
          ) : (
            <Button
              className="ml-auto"
              buttonStyle="danger"
              buttonSize="xs"
              full={false}
              onClick={() => onClickDelete(comment.id)}
            >
              <SvgIcon iconType="FiX" />
            </Button>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default Comment;
