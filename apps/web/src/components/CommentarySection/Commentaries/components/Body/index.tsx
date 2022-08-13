import clsx from 'clsx';

import { formatDistance } from 'date-fns';

import type { PropsWithChildren } from 'react';

import type { CommentaryData } from '../../../../../graphql/Commentary/types';

import UserText from '../../../../UserText';

import PageContent from '../../../../PageContent';

interface CommentaryBodyProps
  extends Pick<CommentaryData, 'user' | 'body' | 'createdAt'> {
  isReply?: boolean;
}

const CommentaryBody: React.FC<PropsWithChildren<CommentaryBodyProps>> = ({
  user,
  body,
  createdAt,
  isReply,
  children,
}) => (
  <PageContent
    className={clsx({
      'border-b border-grey-700 last-of-type:border-b-0': !isReply,
      'pt-0 pr-0 pb-3 pl-6 last-of-type:pb-0': isReply,
    })}
  >
    <UserText
      header={
        <span className="text-grey-200 text-sm ml-auto">
          {formatDistance(new Date(createdAt), Date.now(), { addSuffix: true })}
        </span>
      }
      user={user}
      text={body}
      textShort
    >
      {children}
    </UserText>
  </PageContent>
);

export default CommentaryBody;
