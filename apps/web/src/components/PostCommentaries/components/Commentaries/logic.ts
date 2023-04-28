import { useCallback } from 'react';

import { NetworkStatus } from '@apollo/client';

import type {
  FindCommentariesQuery,
  FindCommentariesQueryVariables,
} from '@/gql';

import { useFindCommentariesQuery } from '@/gql';

interface CommentariesLogicProps {
  postId: string;
}

export const useLogic = ({ postId }: CommentariesLogicProps) => {
  const {
    data: commentariesResponse,
    networkStatus,
    fetchMore,
  } = useFindCommentariesQuery({
    variables: { postId, page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = useCallback(async () => {
    if (networkStatus !== NetworkStatus.ready) return;

    if (!commentariesResponse.commentaries.pageInfo.hasNextPage) {
      return;
    }

    await fetchMore<FindCommentariesQuery, FindCommentariesQueryVariables>({
      variables: {
        postId,
        page: commentariesResponse.commentaries.pageInfo.currentPage + 1,
      },
      updateQuery: (
        { commentaries: previousQueryResult },
        { fetchMoreResult: { commentaries: fetchMoreResult } },
      ) => ({
        commentaries: {
          ...fetchMoreResult,
          edges: [...previousQueryResult.edges, ...fetchMoreResult.edges],
        },
      }),
    });
  }, [networkStatus, fetchMore]);

  return {
    commentaries: commentariesResponse,
    networkStatus,

    handleScroll,
  };
};
