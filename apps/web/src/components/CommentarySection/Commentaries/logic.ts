import { useCallback } from 'react';

import { NetworkStatus, useMutation, useQuery } from '@apollo/client';

import type {
  FindCommentariesResponse,
  FindCommentariesInput,
  DeleteCommentaryInput,
} from '../../../graphql/Commentary/types';

import {
  FIND_COMMENTARIES,
  DELETE_COMMENTARY,
} from '../../../graphql/Commentary';

export interface CommentariesLogicProps {
  postId: string;
}

type DeleteHandles = (commentaryId: string) => Promise<void>;

interface CommentariesLogicHandles {
  commentaries: FindCommentariesResponse;
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
    error,
    fetchMore,
  } = useQuery<FindCommentariesResponse, FindCommentariesInput>(
    FIND_COMMENTARIES,
    {
      variables: { postId, first: ITEMS_PER_PAGE },
      notifyOnNetworkStatusChange: true,
    },
  );

  const [deleteComment, deleteCommentResponse] = useMutation<
    unknown,
    DeleteCommentaryInput
  >(DELETE_COMMENTARY, {
    update: (cache, _, context) => {
      // TODO delete replies from cache on commentary delete

      cache.updateQuery<FindCommentariesResponse>(
        {
          query: FIND_COMMENTARIES,
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

    try {
      await deleteComment({ variables: { commentaryId } });
    } catch (err) {
      console.error(err);
    }

    deleteCommentResponse.reset();
  };

  const handleScroll = useCallback(async () => {
    if (networkStatus !== NetworkStatus.ready) return;

    await fetchMore<FindCommentariesResponse, FindCommentariesInput>({
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
