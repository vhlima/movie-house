import { NetworkStatus } from '@apollo/client';

import type {
  FindRepliesQuery,
  FindRepliesQueryVariables,
} from '../../../../graphql';

import { useFindRepliesQuery } from '../../../../graphql';

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

  const fetchReplies = async () => {
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
  };

  return {
    networkStatus,
    repliesResponse,

    fetchReplies,
  };
};
