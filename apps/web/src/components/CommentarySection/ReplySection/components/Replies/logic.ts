import { useMutation } from '@apollo/client';

import type {
  DeleteReplyInput,
  FindRepliesCacheInput,
  FindRepliesResponse,
} from '../../../../../graphql/Reply/types';

import { DELETE_REPLY, FIND_REPLIES } from '../../../../../graphql/Reply';

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
  const [deleteReply, deleteReplyResponse] = useMutation<
    unknown,
    DeleteReplyInput
  >(DELETE_REPLY, {
    update: (cache, _, context) => {
      cache.updateQuery<FindRepliesResponse, FindRepliesCacheInput>(
        {
          query: FIND_REPLIES,
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
