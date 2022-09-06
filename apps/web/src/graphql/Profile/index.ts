import { gql } from '@apollo/client';

export const FIND_USER_PROFILE = gql`
  query FindUserProfile($userId: String!) {
    userProfile(userId: $userId) @connection(key: "userProfile") {
      isFollowing

      followerCount
      followingCount

      listCount

      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;
