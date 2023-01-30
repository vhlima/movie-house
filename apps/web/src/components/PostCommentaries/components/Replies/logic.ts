import { NetworkStatus } from '@apollo/client';

import type {
  FindRepliesQuery,
  FindRepliesQueryVariables,
} from '../../../../graphql';

import {
  useFindRepliesQuery,
  useDeleteReplyMutation,
} from '../../../../graphql';

import { useRepliesCache } from '../../hooks/useRepliesCache';
import { useCommentariesCache } from '../../hooks/useCommentariesCache';

interface RepliesLogicProps {
  commentaryId: string;
}

const ITEMS_PER_PAGE = 5;

export const useLogic = ({ commentaryId }: RepliesLogicProps) => {
  const {
    data: repliesResponse,
    called,
    networkStatus,
    fetchMore,
  } = useFindRepliesQuery({
    variables: { first: ITEMS_PER_PAGE, commentaryId },
    notifyOnNetworkStatusChange: true,
  });

  async function fetchReplies() {
    if (!called || networkStatus !== NetworkStatus.ready) return;

    await fetchMore<FindRepliesQuery, FindRepliesQueryVariables>({
      variables: {
        commentaryId,
        first: ITEMS_PER_PAGE,
        after: repliesResponse.replies.pageInfo.endCursor,
      },
      updateQuery: (
        { replies: previousQueryResult },
        { fetchMoreResult: { replies: fetchMoreResult } },
      ) => ({
        replies: {
          pageInfo: fetchMoreResult.pageInfo,
          edges: [...previousQueryResult.edges, ...fetchMoreResult.edges],
        },
      }),
    });
  }

  // const [deleteReply] = useDeleteReplyMutation({
  //   errorPolicy: 'all',
  //   update: (cache, _, context) => {
  //     const { updateCache } = useRepliesCache(commentaryId);

  //     const { changeReplyCount } = useCommentariesCache();

  //     /* Update replies cache removing the deleted reply */
  //     updateCache(cacheData => ({
  //       ...cacheData,
  //       replies: {
  //         ...cacheData.replies,
  //         edges: cacheData.replies.edges.filter(
  //           commentary => commentary.node.id !== context.variables.replyId,
  //         ),
  //       },
  //     }));

  //     /* Update commentaries cache to decrease replyCount */
  //     changeReplyCount(commentaryId, true);
  //   },
  // });

  return {
    networkStatus,
    repliesResponse,

    fetchReplies,
    // deleteReply,
  };
};
