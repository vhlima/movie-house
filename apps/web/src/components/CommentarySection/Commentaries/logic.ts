import { useCallback, useRef } from 'react';

import { NetworkStatus, useMutation, useQuery } from '@apollo/client';

import type {
  CommentariesPaginatedResponse,
  CommentaryCacheData,
} from '../../../types/commentary';

import { COMMENTARIES, DELETE_COMMENTARY } from '../../../graphql/commentary';

export interface CommentariesLogicProps {
  postId: string;
}

type DeleteHandles = (commentaryId: string) => Promise<void>;

interface CommentariesLogicHandles {
  commentariesResponse: CommentariesPaginatedResponse;
  networkStatus: NetworkStatus;

  handleDelete: DeleteHandles;

  handleScroll: () => Promise<void>;
}

export const useLogic = ({
  postId,
}: CommentariesLogicProps): CommentariesLogicHandles => {
  const pageRef = useRef<number>(1);

  const {
    data: commentariesResponse,
    networkStatus,
    fetchMore,
  } = useQuery<CommentariesPaginatedResponse>(COMMENTARIES, {
    variables: { postId, page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteComment, deleteCommentResponse] = useMutation<
    string,
    { commentaryId: string }
  >(DELETE_COMMENTARY, {
    update: (cache, _, context) => {
      // const commentariesData = cache.readQuery<CommentaryCacheData>({
      //   query: COMMENTARIES, // todo check that
      //   variables: { postId },
      // });
      // cache.writeQuery<CommentaryCacheData>({
      //   query: COMMENTARIES,
      //   variables: { postId },
      //   data: {
      //     commentaries: {
      //       ...commentariesData.commentaries,
      //       commentaries: (
      //         commentariesData.commentaries.commentaries || []
      //       ).filter(
      //         commentary => commentary._id !== context?.variables?.commentaryId,
      //       ),
      //     },
      //   },
      // });
    },
  });

  const handleDelete: DeleteHandles = async commentaryId => {
    if (deleteCommentResponse.loading) return;

    await deleteComment({ variables: { commentaryId } });

    deleteCommentResponse.reset();
  };

  const handleScroll = useCallback(async () => {
    if (networkStatus !== NetworkStatus.ready) return;

    pageRef.current += 1;

    await fetchMore<CommentaryCacheData>({
      variables: {
        postId,
        page: pageRef.current,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        const updatedCache = {
          commentaries: {
            ...fetchMoreResult.commentaries,
            commentaries: [
              ...previousQueryResult.commentaries.commentaries,
              ...fetchMoreResult.commentaries.commentaries,
            ],
          },
        } as CommentaryCacheData;

        return updatedCache;
      },
    });
  }, [networkStatus, fetchMore]);

  return {
    commentariesResponse,
    networkStatus,

    handleDelete,

    handleScroll,
  };
};
