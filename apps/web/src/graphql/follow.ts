import { gql } from '@apollo/client';

const FOLLOW_FIELDS = gql`
  fragment FollowFields on Followers {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        targetUser {
          id
          username
          realName
          profilePictureUrl
        }
      }
    }
  }
`;

export const FOLLOW = gql`
  mutation Follow($userId: String!) {
    follow(userId: $userId)
  }
`;

export const IS_FOLLOWING = gql`
  query IsFollowing($userId: String!) {
    isFollowing(userId: $userId)
      @connection(key: "isFollowing", filter: ["userId"])
  }
`;

export const FIND_FOLLOWING = gql`
  ${FOLLOW_FIELDS}

  query FindFollowing($first: Int!, $userId: String!, $after: String) {
    following(first: $first, userId: $userId, after: $after) {
      ...FollowFields
    }
  }
`;

export const FIND_FOLLOWERS = gql`
  ${FOLLOW_FIELDS}

  query FindFollowers($first: Int!, $userId: String!, $after: String) {
    followers(first: $first, userId: $userId, after: $after) {
      ...FollowFields
    }
  }
`;
