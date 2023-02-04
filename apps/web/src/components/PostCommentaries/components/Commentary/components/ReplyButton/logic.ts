import { useAddReplyMutation } from '../../../../../../graphql';

import { useRepliesCache } from '../../../../hooks/useRepliesCache';
import { useCommentariesCache } from '../../../../hooks/useCommentariesCache';

export function useLogic(commentaryId: string) {
  const { changeReplyCount } = useCommentariesCache();

  const { updateCache } = useRepliesCache(commentaryId);

  const [addReply, { loading, error }] = useAddReplyMutation({
    update: (cache, { data }) => {
      if (!data) return;

      /* Update replies cache with the new reply added */
      updateCache(cacheData => ({
        ...cacheData,
        replies: {
          ...cacheData.replies,
          pageInfo: cacheData
            ? {
                ...cacheData.replies.pageInfo,
                maxItems: cacheData.replies.pageInfo.maxItems + 1,
              }
            : {
                maxItems: 1,
                endCursor: null,
                hasNextPage: false,
              },
          edges: [
            ...(cacheData ? cacheData.replies.edges : []),
            {
              cursor: data.reply.createdAt,
              node: data.reply,
            },
          ],
        },
      }));

      /* Update the root commentary to increment replyCount */
      changeReplyCount(commentaryId);
    },
  });

  async function handleSubmit(body: string) {
    const { errors } = await addReply({
      variables: { commentaryId, body },
    });

    return !errors;
  }

  return {
    loading,
    error,

    handleSubmit,
  };
}
