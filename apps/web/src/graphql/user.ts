import { gql } from '@apollo/client';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    realName
    biography
    profilePictureUrl
    createdAt
  }
`;

export const FIND_USER = gql`
  ${USER_FIELDS}

  query FindUser($username: String!) {
    user(username: $username) {
      ...UserFields
    }
  }
`;

export const FIND_USER_BY_PROVIDER = gql`
  query FindUserByProvider($providerId: String!, $provider: String!) {
    userByProvider(providerId: $providerId, provider: $provider) {
      id
      username
      realName
      profilePictureUrl
    }
  }
`;

export const USER_REGISTER = gql`
  mutation UserRegister($githubId: Int!) {
    register(githubId: $githubId)
  }
`;
