import { NetworkStatus } from '@apollo/client';

import type { PropsWithChildren } from 'react';

import Observer from '../../../Observer';
import ErrorText from '../../../ErrorText';
import LoadingSpinner from '../../../LoadingSpinner';

import Reply from '../Reply';

import { useLogic } from './logic';

interface RepliesProps {
  commentaryId: string;
}

const Replies: React.FC<PropsWithChildren<RepliesProps>> = ({
  commentaryId,
}) => {
  const { repliesResponse, networkStatus, fetchReplies } = useLogic({
    commentaryId,
  });

  if (networkStatus === NetworkStatus.error) {
    return <ErrorText text="Error loading replies" />;
  }

  if (networkStatus === NetworkStatus.loading) {
    return <LoadingSpinner className="flex justify-center mt-4" />;
  }

  if (!repliesResponse || repliesResponse.replies.edges.length <= 0) {
    return null;
  }

  return (
    <div>
      {repliesResponse.replies.edges.map(({ node: reply }) => (
        <Reply key={`commentary-reply-${reply.id}`} reply={reply} />
      ))}

      {repliesResponse.replies.pageInfo.hasNextPage && (
        <Observer onIntersect={fetchReplies}>
          <LoadingSpinner className="mt-4" center />;
        </Observer>
      )}
    </div>
  );
};

export default Replies;
