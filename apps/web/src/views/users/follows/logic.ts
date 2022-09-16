import { useCallback } from 'react';

import { NetworkStatus, QueryResult, useQuery } from '@apollo/client';

import type {
  FindFollowersQuery,
  FindFollowersQueryVariables,
  FindFollowingQuery,
  FindFollowingQueryVariables,
} from '../../../graphql';

import { FindFollowersDocument, FindFollowingDocument } from '../../../graphql';

export interface FollowsLogicProps {
  followType: 'following' | 'followers';
  userId: string;
}

interface FollowsLogicHandles {
  query: QueryResult<
    FindFollowersQuery | FindFollowingQuery,
    FindFollowersQueryVariables | FindFollowingQueryVariables
  >;
  handleScroll: () => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

export const useLogic = ({
  followType,
  userId,
}: FollowsLogicProps): FollowsLogicHandles => {
  const query = useQuery<
    FindFollowersQuery | FindFollowingQuery,
    FindFollowersQueryVariables | FindFollowingQueryVariables
  >(
    followType === 'followers' ? FindFollowersDocument : FindFollowingDocument,
    {
      variables: { userId, first: ITEMS_PER_PAGE },
      notifyOnNetworkStatusChange: true,
    },
  );

  const handleScroll = useCallback(async () => {
    const { data, networkStatus, fetchMore } = query;

    if (!data) return;

    if (networkStatus !== NetworkStatus.ready) return;

    await fetchMore<
      FindFollowersQuery | FindFollowingQuery,
      FindFollowersQueryVariables | FindFollowingQueryVariables
    >({
      variables: {
        userId,
        first: ITEMS_PER_PAGE,
        after: (followType === 'followers'
          ? (data as FindFollowersQuery).followers
          : (data as FindFollowingQuery).following
        ).pageInfo.endCursor,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (followType === 'followers') {
          const followersResult = fetchMoreResult as FindFollowersQuery;

          return {
            followers: {
              pageInfo: followersResult.followers.pageInfo,
              edges: [
                ...(previousQueryResult as FindFollowersQuery).followers.edges,
                ...followersResult.followers.edges,
              ],
            },
          } as FindFollowersQuery;
        }

        const followingResult = fetchMoreResult as FindFollowingQuery;

        return {
          following: {
            pageInfo: followingResult.following.pageInfo,
            edges: [
              ...(previousQueryResult as FindFollowingQuery).following.edges,
              ...followingResult.following.edges,
            ],
          },
        } as FindFollowingQuery;
      },
    });
  }, [query]);

  return {
    query,
    handleScroll,
  };
};
