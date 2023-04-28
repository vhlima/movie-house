import { useApolloClient } from '@apollo/client';

import type { FindCommentariesQuery } from '@/gql';

import { FindCommentariesDocument } from '@/gql';

export const useCommentariesCache = () => {
  const { cache } = useApolloClient();

  function updateCache(
    callback: (cacheData: FindCommentariesQuery) => FindCommentariesQuery,
  ) {
    cache.updateQuery<FindCommentariesQuery>(
      {
        query: FindCommentariesDocument,
      },
      cacheData => callback(cacheData),
    );
  }

  function changeReplyCount(commentaryId: string, decrease?: boolean) {
    updateCache(cacheData => {
      const commentaryIndex = cacheData.commentaries.edges.findIndex(
        edge => edge.node.id === commentaryId,
      );

      if (commentaryIndex < 0) {
        return cacheData;
      }

      const updatedEdges = [...cacheData.commentaries.edges];

      const commentaryNode = updatedEdges[commentaryIndex];

      const { replyCount } = commentaryNode.node;

      updatedEdges[commentaryIndex] = {
        ...commentaryNode,
        node: {
          ...commentaryNode.node,
          replyCount: !decrease ? replyCount + 1 : replyCount - 1,
        },
      };

      return {
        ...cacheData,
        commentaries: {
          ...cacheData.commentaries,
          edges: updatedEdges,
        },
      };
    });
  }

  return {
    changeReplyCount,
    updateCache,
  };
};
