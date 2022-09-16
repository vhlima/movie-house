import { useEffect, useState } from 'react';

import { NetworkStatus } from '@apollo/client';

import type { Dispatch, SetStateAction } from 'react';

import type {
  FindRepliesQuery,
  FindRepliesQueryVariables,
} from '../../../graphql';

import { useFindRepliesLazyQuery } from '../../../graphql';

interface RepliesLogicHandles {
  networkStatus: NetworkStatus;
  repliesResponse: FindRepliesQuery;

  isViewingReplies: boolean;
  setViewingReplies: Dispatch<SetStateAction<boolean>>;

  fetchReplies: () => Promise<void>;
}

interface RepliesLogicProps {
  commentaryId: string;
}

const ITEMS_PER_PAGE = 5;

export const useLogic = ({
  commentaryId,
}: RepliesLogicProps): RepliesLogicHandles => {
  const [isViewingReplies, setViewingReplies] = useState<boolean>(false);

  const [fetch, { data: repliesResponse, called, networkStatus, fetchMore }] =
    useFindRepliesLazyQuery({
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

  useEffect(() => {
    if (!called) {
      const firstFetch = async () => {
        await fetch();
      };

      firstFetch();
    }
  }, [called]);

  return {
    networkStatus,
    repliesResponse,

    isViewingReplies,
    setViewingReplies,

    fetchReplies,
  };
};
