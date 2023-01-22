import {
  useAddReplyMutation,
  useAddCommentaryMutation,
} from '../../../../graphql';

import { useRepliesCache } from '../../hooks/useRepliesCache';

import { useCommentariesCache } from '../../hooks/useCommentariesCache';

interface TextInputLogicProps {
  rootId: string | number;
}

function useReplyLogic(commentaryId: string) {
  const { changeReplyCount } = useCommentariesCache();

  const { updateCache } = useRepliesCache(commentaryId);

  const [addReply, { loading, error }] = useAddReplyMutation({
    update: (cache, { data }) => {
      if (!data) return;

      /* Update replies cache with the new reply added */
      updateCache(cacheData => ({
        ...cacheData,
        replies: {
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

function useCommentaryLogic(postId: number) {
  const { updateCache } = useCommentariesCache();

  const [addComment, { loading, error }] = useAddCommentaryMutation({
    update: (cache, { data }) => {
      if (!data) return;

      /* Update commentaries cache to add the new commentary */
      updateCache(cacheData => ({
        ...cacheData,
        commentaries: {
          ...cacheData.commentaries,
          edges: [
            ...cacheData.commentaries.edges,
            {
              cursor: data.comment.createdAt,
              node: data.comment,
            },
          ],
        },
      }));
    },
  });

  async function handleSubmit(body: string) {
    const { errors } = await addComment({
      variables: { postId, body },
    });

    return !errors;
  }

  return {
    loading,
    error,

    handleSubmit,
  };
}

export const useLogic = ({ rootId }: TextInputLogicProps) => {
  const replyLogic = useReplyLogic(typeof rootId === 'string' ? rootId : '');
  const commentaryLogic = useCommentaryLogic(
    typeof rootId === 'number' ? rootId : -1,
  );

  if (typeof rootId === 'string') {
    return replyLogic;
  }

  return commentaryLogic;
};
