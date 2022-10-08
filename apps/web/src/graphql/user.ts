import { gql } from '@apollo/client';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    realName
    biography
    profilePictureUrl
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

export const SIGN_IN = gql`
  ${USER_FIELDS}

  mutation SignIn($username: String!) {
    login(username: $username) {
      ...UserFields
    }
  }
`;
