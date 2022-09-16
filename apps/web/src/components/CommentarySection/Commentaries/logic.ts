import { useCallback } from 'react';

import { NetworkStatus } from '@apollo/client';

import type {
  FindCommentariesQuery,
  FindCommentariesQueryVariables,
} from '../../../graphql';

import {
  FindCommentariesDocument,
  useDeleteCommentaryMutation,
  useFindCommentariesQuery,
} from '../../../graphql';

export interface CommentariesLogicProps {
  postId: string;
}

type DeleteHandles = (commentaryId: string) => Promise<void>;

interface CommentariesLogicHandles {
  commentaries: FindCommentariesQuery;
  networkStatus: NetworkStatus;

  handleDelete: DeleteHandles;

  handleScroll: () => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

export const useLogic = ({
  postId,
}: CommentariesLogicProps): CommentariesLogicHandles => {
  const {
    data: commentariesResponse,
    networkStatus,
    fetchMore,
  } = useFindCommentariesQuery({
    variables: { postId, first: ITEMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteComment, deleteCommentResponse] = useDeleteCommentaryMutation({
    update: (cache, _, context) => {
      // TODO delete replies from cache on commentary delete
      cache.updateQuery<FindCommentariesQuery>(
        {
          query: FindCommentariesDocument,
        },
        cacheData => ({
          commentaries: {
            pageInfo: cacheData.commentaries.pageInfo,
            edges: cacheData.commentaries.edges.filter(
              commentary =>
                commentary.node.id !== context.variables.commentaryId,
            ),
          },
        }),
      );
    },
  });

  const handleDelete: DeleteHandles = async commentaryId => {
    if (deleteCommentResponse.loading) return;

    await deleteComment({ variables: { commentaryId } });

    deleteCommentResponse.reset();
  };

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

    handleDelete,

    handleScroll,
  };
};
