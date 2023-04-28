import { useDeleteReplyMutation } from '@/gql';

import { useRepliesCache } from '../../hooks/useRepliesCache';
import { useCommentariesCache } from '../../hooks/useCommentariesCache';

export const useLogic = (commentaryId: string) => {
  const { updateCache } = useRepliesCache(commentaryId);

  const { changeReplyCount } = useCommentariesCache();

  const [deleteReply] = useDeleteReplyMutation({
    update: (cache, _, context) => {
      /* Update replies cache removing the deleted reply */
      updateCache(cacheData => ({
        ...cacheData,
        replies: {
          ...cacheData.replies,
          edges: cacheData.replies.edges.filter(
            reply => reply.node.id !== context.variables.replyId,
          ),
        },
      }));

      /* Update commentaries cache to decrease replyCount */
      changeReplyCount(commentaryId, true);
    },
  });

  async function handleDelete(replyId: string) {
    await deleteReply({ variables: { replyId } });
  }

  return {
    handleDelete,
  };
};
