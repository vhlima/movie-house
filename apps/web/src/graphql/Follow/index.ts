import { gql } from '@apollo/client';
import { appendGql } from '../../utils';

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

export const UNFOLLOW = gql`
  mutation Unfollow($userId: String!) {
    unfollow(userId: $userId)
  }
`;

export const IS_FOLLOWING = gql`
  query IsFollowing($userId: String!) {
    isFollowing(userId: $userId)
      @connection(key: "isFollowing", filter: ["userId"])
  }
`;

export const FIND_FOLLOWING = appendGql(
  FOLLOW_FIELDS,
  gql`
    query FindFollowing($first: Int!, $userId: String!) {
      following(first: $first, userId: $userId) {
        ...FollowFields
      }
    }
  `,
);

export const FIND_FOLLOWERS = appendGql(
  FOLLOW_FIELDS,
  gql`
    query FindFollowing($first: Int!, $userId: String!) {
      followers(first: $first, userId: $userId) {
        ...FollowFields
      }
    }
  `,
);
