import { gql } from '@apollo/client';

export const FIND_USER = gql`
  query FindUser($username: String!) {
    user(username: $username) {
      id
      username
      realName
      biography
      profilePictureUrl
      createdAt
    }
  }
`;

export const FIND_USER_BY_ID = gql`
  query FindUserById($userId: String!) {
    userById(userId: $userId) {
      id
      username
      realName
      profilePictureUrl
      createdAt
    }
  }
`;

export const FIND_USER_BY_GITHUB_ID = gql`
  query FindUserByGithubId($githubId: String!) {
    userByGithubId(githubId: $githubId) {
      id
      username
      realName
      profilePictureUrl
      createdAt
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($githubId: String!) {
    signUp(githubId: $githubId)
  }
`;

export const FIND_PROFILE_STATS = gql`
  query FindProfileStats($userId: String!) {
    profileStats(userId: $userId) {
      followerCount
      followingCount
      listCount
      moviesWatchedCount
      moviesWatchedThisYearCount
    }
  }
`;
