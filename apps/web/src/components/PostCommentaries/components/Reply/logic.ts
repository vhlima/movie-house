import { useDeleteReplyMutation } from '../../../../graphql';

import { useRepliesCache } from '../../hooks/useRepliesCache';
import { useCommentariesCache } from '../../hooks/useCommentariesCache';

export const useLogic = (commentaryId: string) => {
  const [deleteReply] = useDeleteReplyMutation({
    update: (cache, _, context) => {
      const { updateCache } = useRepliesCache(commentaryId);

      const { changeReplyCount } = useCommentariesCache();

      /* Update replies cache removing the deleted reply */
      updateCache(cacheData => ({
        ...cacheData,
        replies: {
          ...cacheData.replies,
          edges: cacheData.replies.edges.filter(
            commentary => commentary.node.id !== context.variables.replyId,
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
