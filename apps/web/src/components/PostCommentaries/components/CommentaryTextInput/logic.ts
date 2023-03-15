import { useCreateCommentaryMutation } from '@/graphql';

import { useCommentariesCache } from '@/hooks/useCommentariesCache';

export function useLogic(postId: string) {
  const { updateCache } = useCommentariesCache();

  const [addComment, { loading, error }] = useCreateCommentaryMutation({
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
              node: data.createCommentary,
            },
          ],
        },
      }));
    },
  });

  async function handleSubmit(content: string) {
    const { errors } = await addComment({
      variables: { postId, content },
    });

    return !errors;
  }

  return {
    loading,
    error,

    handleSubmit,
  };
}
