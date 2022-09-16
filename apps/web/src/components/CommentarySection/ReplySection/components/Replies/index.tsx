import { NetworkStatus } from '@apollo/client';

import type { PropsWithChildren } from 'react';

import type { FindRepliesQuery, Reply } from '../../../../../graphql';

import { useLogic } from './logic';

import LoadingSpinner from '../../../../LoadingSpinner';

import ErrorText from '../../../../ErrorText';

import Comment from '../../../components/Comment';

interface RepliesProps {
  commentaryId: string;
  repliesResponse: FindRepliesQuery;
  networkStatus: NetworkStatus;
}

const Replies: React.FC<PropsWithChildren<RepliesProps>> = ({
  commentaryId,
  repliesResponse,
  networkStatus,
}) => {
  const { handleDelete } = useLogic({ commentaryId });

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
        <Comment
          isReply
          key={reply.id}
          comment={reply as Reply}
          onClickDelete={handleDelete}
          onClickReport={() => ({})}
        />
      ))}

      {repliesResponse.replies.pageInfo.hasNextPage && (
        <div>
          <h1>do you want to load more replies?</h1>
        </div>
      )}
    </div>
  );
};

export default Replies;
