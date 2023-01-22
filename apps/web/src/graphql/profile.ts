import { gql } from '@apollo/client';

export const FIND_USER_PROFILE_STATS = gql`
  query FindUserProfileStats($userId: String!) {
    userProfileStats(userId: $userId) {
      followerCount
      followingCount
      listCount
      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;
