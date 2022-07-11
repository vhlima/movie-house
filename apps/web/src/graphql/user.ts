import { gql } from '@apollo/client';

export const USER = gql`
  query ($userId: String!) {
    user(UserId: $userId) {
      _id
      username
      realName
      profilePicture
      favoriteMovies {
        id
        original_title
        posterUrl
      }
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
  query users {
    users {
      _id
      username
      realName
      profilePicture
      favoriteMovies {
        id
        original_title
        posterUrl
      }
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
  query users {
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
      favoriteMovies {
        id
        original_title
        posterUrl
      }
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const ADD_FAVORITE_MOVIE = gql`
  mutation ($movieId: String!, $userId: String!) {
    userAddFavoriteMovie(movieId: $movieId, userId: $userId) {
      _id
      username
      realName
      profilePicture
      favoriteMovies {
        id
        original_title
        posterUrl
      }
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;

export const REMOVE_FAVORITE_MOVIE = gql`
  mutation ($movieId: String!, $userId: String!) {
    userRemoveFavoriteMovie(movieId: $movieId, userId: $userId) {
      _id
      username
      realName
      profilePicture
      favoriteMovies {
        id
        original_title
        posterUrl
      }
      followers {
        _id
      }
      following {
        _id
      }
    }
  }
`;
