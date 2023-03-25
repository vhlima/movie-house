import { useDeleteCommentaryMutation } from '@/graphql';

import { useRepliesCache } from '../../hooks/useRepliesCache';
import { useCommentariesCache } from '../../hooks/useCommentariesCache';

export function useLogic(commentaryId: string) {
  const { updateCache } = useCommentariesCache();

  const { deleteReplies } = useRepliesCache(commentaryId);

  const [deleteComment] = useDeleteCommentaryMutation({
    update: (cache, _, context) => {
      deleteReplies();

      updateCache(cacheData => ({
        ...cacheData,
        commentaries: {
          ...cacheData.commentaries,
          edges: cacheData.commentaries.edges.filter(
            commentary => commentary.node.id !== context.variables.commentaryId,
          ),
        },
      }));
    },
  });

  async function handleDeleteCommentary() {
    await deleteComment({
      variables: { commentaryId },
    });
  }

  return {
    handleDeleteCommentary,
  };
}
