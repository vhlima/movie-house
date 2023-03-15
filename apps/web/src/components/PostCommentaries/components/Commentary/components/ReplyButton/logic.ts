import { useCreateReplyMutation } from '@/graphql';

import { useRepliesCache } from '../../../../hooks/useRepliesCache';
import { useCommentariesCache } from '../../../../hooks/useCommentariesCache';

export function useLogic(commentaryId: string) {
  const { changeReplyCount } = useCommentariesCache();

  const { updateCache } = useRepliesCache(commentaryId);

  const [createReply, { loading, error }] = useCreateReplyMutation({
    update: (cache, { data }) => {
      if (!data) return;

      updateCache(cacheData => ({
        ...cacheData,
        replies: {
          ...cacheData.replies,
          edges: [
            ...cacheData.replies.edges,
            {
              node: data.createReply,
            },
          ],
        },
      }));

      /* Update the root commentary to increment replyCount */
      changeReplyCount(commentaryId);
    },
  });

  async function handleSubmit(content: string) {
    const { data } = await createReply({
      variables: { commentaryId, content },
    });

    return !data;
  }

  return {
    loading,
    error,

    handleSubmit,
  };
}
