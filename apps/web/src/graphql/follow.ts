import { gql } from '@apollo/client';

export const FOLLOW = gql`
  mutation Follow($userId: String!) {
    follow(userId: $userId)
  }
`;

export const UNFOLLOW = gql`
  mutation Unfollow($userId: String!) {
    unfollow(userId: $userId)
  }
`;

export const IS_FOLLOWING = gql`
  query IsFollowing($userId: String!) {
    isFollowing(userId: $userId)
  }
`;

export const FIND_FOLLOWINGS = gql`
  query FindFollowings($page: Int!, $userId: String!) {
    followings(page: $page, userId: $userId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          followed {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
`;

export const FIND_FOLLOWERS = gql`
  query FindFollowers($page: Int!, $userId: String!) {
    followers(page: $page, userId: $userId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          follower {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
`;
