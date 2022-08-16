import clsx from 'clsx';

import { formatDistance } from 'date-fns';

import type { PropsWithChildren } from 'react';

import type { CommentaryData } from '../../../../graphql/Commentary/types';

import type { ReplyData } from '../../../../graphql/Reply/types';

import UserText from '../../../UserText';

import PageContent from '../../../PageContent';

import CommentButtons from './components/Buttons';

export interface CommentHandles {
  onClickDelete: (commentId: string) => void;
  onClickReport: (commentId: string) => void;
  onClickReply?: (commentId: string) => void;
}

interface CommentProps extends CommentHandles {
  isReply?: boolean;
  comment: CommentaryData | ReplyData;
}

const Comment: React.FC<PropsWithChildren<CommentProps>> = ({
  isReply,
  comment,
  children,
  ...commentHandles
}) => (
  <PageContent
    className={clsx('flex flex-col gap-2', {
      'border-b border-grey-700 last-of-type:border-b-0': !isReply,
      'pt-0 pr-0 pb-3 pl-6 last-of-type:pb-0': isReply,
    })}
  >
    <UserText
      header={
        <span className="text-grey-200 text-sm ml-auto">
          {formatDistance(new Date(comment.createdAt), Date.now(), {
            addSuffix: true,
          })}
        </span>
      }
      user={comment.user}
      text={comment.body}
      textShort
    />

    <CommentButtons comment={comment} {...commentHandles} />

    {children}
  </PageContent>
);

export default Comment;
