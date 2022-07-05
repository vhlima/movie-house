import { gql } from '@apollo/client';

export const USER = gql`
  query Users {
    users {
      _id
      username
      realName
      profilePicture
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const ALL_USERS = gql`
  query Users {
    users {
      _id
      username
      realName
      profilePicture
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const ALL_USERS_ID = gql`
  query Users {
    users {
      _id
    }
  }
`;

export const SIGN_IN = gql`
  mutation ($username: String!) {
    userLogin(username: $username) {
      _id
      username
      realName
      profilePicture
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;
