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

export const useLogic = ({
  postId,
}: CommentariesLogicProps): CommentariesLogicHandles => {
  const {
    data: commentariesResponse,
    networkStatus,
    fetchMore,
  } = useQuery<FindCommentariesResponse, FindCommentariesInput>(
    FIND_COMMENTARIES,
    {
      variables: { postId, first: 10 },
      notifyOnNetworkStatusChange: true,
    },
  );

  const [deleteComment, deleteCommentResponse] = useMutation<
    unknown,
    DeleteCommentaryInput
  >(DELETE_COMMENTARY, {
    update: (cache, _, context) => {
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
        first: 10,
        after: commentariesResponse.commentaries.pageInfo.endCursor,
      },
      updateQuery: (
        { commentaries: previousQueryResult },
        { fetchMoreResult: { commentaries: fetchMoreResult } },
      ) =>
        ({
          commentaries: {
            pageInfo: fetchMoreResult.pageInfo,
            edges: [...previousQueryResult.edges, ...fetchMoreResult.edges],
          },
        } as FindCommentariesResponse),
    });
  }, [networkStatus, fetchMore]);

  return {
    commentaries: commentariesResponse,
    networkStatus,

    handleDelete,

    handleScroll,
  };
};