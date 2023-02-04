import { useAddCommentaryMutation } from '../../../../graphql';

import { useCommentariesCache } from '../../hooks/useCommentariesCache';

export function useLogic(postId: number) {
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
