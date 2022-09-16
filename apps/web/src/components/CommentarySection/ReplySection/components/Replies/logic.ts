import type {
  FindRepliesQuery,
  FindRepliesQueryVariables,
} from '../../../../../graphql';

import {
  FindRepliesDocument,
  useDeleteReplyMutation,
} from '../../../../../graphql';

type DeleteHandles = (replyId: string) => Promise<void>;

interface RepliesLogicHandles {
  handleDelete: DeleteHandles;
}

interface RepliesLogicProps {
  commentaryId: string;
}

export const useLogic = ({
  commentaryId,
}: RepliesLogicProps): RepliesLogicHandles => {
  const [deleteReply, deleteReplyResponse] = useDeleteReplyMutation({
    update: (cache, _, context) => {
      cache.updateQuery<
        FindRepliesQuery,
        Omit<FindRepliesQueryVariables, 'first' | 'after'>
      >(
        {
          query: FindRepliesDocument,
          variables: { commentaryId },
        },
        cacheData => ({
          replies: {
            pageInfo: cacheData.replies.pageInfo,
            edges: cacheData.replies.edges.filter(
              commentary => commentary.node.id !== context.variables.replyId,
            ),
          },
        }),
      );
    },
  });

  const handleDelete: DeleteHandles = async replyId => {
    if (deleteReplyResponse.loading) return;

    await deleteReply({ variables: { replyId } });

    deleteReplyResponse.reset();
  };

  return {
    handleDelete,
  };
};
