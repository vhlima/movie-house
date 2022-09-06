import { NetworkStatus, QueryResult, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { FIND_FOLLOWERS, FIND_FOLLOWING } from '../../../graphql/Follow';

import type {
  FindFollowersResponse,
  FindFollowingResponse,
  FindFollowInput,
} from '../../../graphql/Follow/types';

export interface FollowsLogicProps {
  followType: 'following' | 'followers';
  userId: string;
}

interface FollowsLogicHandles {
  query: QueryResult<
    FindFollowersResponse | FindFollowingResponse,
    FindFollowInput
  >;
  handleScroll: () => Promise<void>;
}

const ITEMS_PER_PAGE = 10;

export const useLogic = ({
  followType,
  userId,
}: FollowsLogicProps): FollowsLogicHandles => {
  const query = useQuery<
    FindFollowersResponse | FindFollowingResponse,
    FindFollowInput
  >(followType === 'followers' ? FIND_FOLLOWERS : FIND_FOLLOWING, {
    variables: { userId, first: ITEMS_PER_PAGE },
    notifyOnNetworkStatusChange: true,
  });

  const handleScroll = useCallback(async () => {
    const { data, networkStatus, fetchMore } = query;

    if (!data) return;

    if (networkStatus !== NetworkStatus.ready) return;

    await fetchMore<
      FindFollowersResponse | FindFollowingResponse,
      FindFollowInput
    >({
      variables: {
        userId,
        first: ITEMS_PER_PAGE,
        after: (followType === 'followers'
          ? (data as FindFollowersResponse).followers
          : (data as FindFollowingResponse).following
        ).pageInfo.endCursor,
      },
      updateQuery: (previousQueryResult, { fetchMoreResult }) => {
        if (followType === 'followers') {
          const followersResult = fetchMoreResult as FindFollowersResponse;

          return {
            followers: {
              pageInfo: followersResult.followers.pageInfo,
              edges: [
                ...(previousQueryResult as FindFollowersResponse).followers
                  .edges,
                ...followersResult.followers.edges,
              ],
            },
          } as FindFollowersResponse;
        }

        const followingResult = fetchMoreResult as FindFollowingResponse;

        return {
          following: {
            pageInfo: followingResult.following.pageInfo,
            edges: [
              ...(previousQueryResult as FindFollowingResponse).following.edges,
              ...followingResult.following.edges,
            ],
          },
        } as FindFollowingResponse;
      },
    });
  }, [query]);

  return {
    query,
    handleScroll,
  };
};
