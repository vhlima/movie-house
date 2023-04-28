import { useCallback } from 'react';

import { NetworkStatus, QueryResult, useQuery } from '@apollo/client';

import type {
  FindFollowersQuery,
  FindFollowersQueryVariables,
  FindFollowingsQuery,
  FindFollowingsQueryVariables,
} from '@/gql';

import { FindFollowersDocument, FindFollowingsDocument } from '@/gql';

export interface FollowsLogicProps {
  followType: 'following' | 'followers';
  userId: string;
}

interface FollowsLogicHandles {
  query: QueryResult<
    FindFollowersQuery | FindFollowingsQuery,
    FindFollowersQueryVariables | FindFollowingsQueryVariables
  >;
  handleScroll: () => Promise<void>;
}

export const useLogic = ({
  followType,
  userId,
}: FollowsLogicProps): FollowsLogicHandles => {
  const query = useQuery<
    FindFollowersQuery | FindFollowingsQuery,
    FindFollowersQueryVariables | FindFollowingsQueryVariables
  >(
    followType === 'followers' ? FindFollowersDocument : FindFollowingsDocument,
    {
      variables: { userId, page: 1 },
      notifyOnNetworkStatusChange: true,
    },
  );

  const handleScroll = useCallback(async () => {
    const { data, networkStatus, fetchMore } = query;

    if (!data) return;

    if (networkStatus !== NetworkStatus.ready) return;

    await fetchMore<
      FindFollowersQuery | FindFollowingsQuery,
      FindFollowersQueryVariables | FindFollowingsQueryVariables
    >({
      variables: {
        userId,
        page:
          (followType === 'followers'
            ? (data as FindFollowersQuery).followers
            : (data as FindFollowingsQuery).followings
          ).pageInfo.currentPage + 1,
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

        const followingResult = fetchMoreResult as FindFollowingsQuery;

        return {
          followings: {
            ...followingResult.followings,
            edges: [
              ...(previousQueryResult as FindFollowingsQuery).followings.edges,
              ...followingResult.followings.edges,
            ],
          },
        } as FindFollowingsQuery;
      },
    });
  }, [query]);

  return {
    query,
    handleScroll,
  };
};
