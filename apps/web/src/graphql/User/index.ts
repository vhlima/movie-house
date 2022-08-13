import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    username
    realName
    biography
    profilePictureUrl
  }
`;

export const FIND_USER = appendGql(
  USER_FIELDS,
  gql`
    query FindUser($userId: String!) {
      user(userId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const SIGN_IN = appendGql(
  USER_FIELDS,
  gql`
    mutation ($username: String!) {
      login(username: $username) {
        ...UserFields
      }
    }
  `,
);

export const ADD_FAVORITE_MOVIE = appendGql(
  USER_FIELDS,
  gql`
    mutation ($movieId: String!, $userId: String!) {
      addFavoriteMovie(movieId: $movieId, userId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const REMOVE_FAVORITE_MOVIE = appendGql(
  USER_FIELDS,
  gql`
    mutation ($movieId: String!, $userId: String!) {
      removeFavoriteMovie(movieId: $movieId, userId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const RATE_MOVIE = appendGql(
  USER_FIELDS,
  gql`
    mutation ($data: RateInput!, $movieId: String!, $userId: String!) {
      userAddRate(data: $data, movieId: $movieId, userId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const UPDATE_USER = appendGql(
  USER_FIELDS,
  gql`
    mutation ($data: UserInput!, $userId: String!) {
      userUpdate(data: $data, userId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const ADD_MOVIE_TO_WATCHLIST = appendGql(
  USER_FIELDS,
  gql`
    mutation ($movieId: String!, $userId: String!) {
      addMovieToWatchlist(movieId: $movieId, userId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const REMOVE_MOVIE_FROM_WATCHLIST = appendGql(
  USER_FIELDS,
  gql`
    mutation ($movieId: String!, $userId: String!) {
      removeMovieFromWatchlist(movieId: $movieId, userId: $userId) {
        ...UserFields
      }
    }
  `,
);
