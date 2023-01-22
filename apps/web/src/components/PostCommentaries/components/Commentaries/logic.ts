import { useCallback } from 'react';

import { NetworkStatus } from '@apollo/client';

import type {
  FindCommentariesQuery,
  FindCommentariesQueryVariables,
} from '../../../../graphql';

import { useFindCommentariesQuery } from '../../../../graphql';

interface CommentariesLogicProps {
  postId: number;
}

const ITEMS_PER_PAGE = 10;

export const useLogic = ({ postId }: CommentariesLogicProps) => {
  const {
    data: commentariesResponse,
    networkStatus,
    fetchMore,
  } = useFindCommentariesQuery({
    variables: { postId, first: ITEMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = useCallback(async () => {
    if (networkStatus !== NetworkStatus.ready) return;

    await fetchMore<FindCommentariesQuery, FindCommentariesQueryVariables>({
      variables: {
        postId,
        first: ITEMS_PER_PAGE,
        after: commentariesResponse.commentaries.pageInfo.endCursor,
      },
      updateQuery: (
        { commentaries: previousQueryResult },
        { fetchMoreResult: { commentaries: fetchMoreResult } },
      ) => ({
        commentaries: {
          pageInfo: fetchMoreResult.pageInfo,
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
