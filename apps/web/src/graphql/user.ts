import { gql } from '@apollo/client';

import { appendGql } from '../utils';

import { MOVIE_FIELDS } from './movie';

const USER_FIELDS = appendGql(
  MOVIE_FIELDS,
  gql`
    fragment UserFields on User {
      _id
      username
      realName
      biography
      profilePicture
      favoriteMovies {
        id
        original_title
        posterUrl
      }
      moviesInfo {
        watched
        rating
        liked
        review {
          body
        }
        movie {
          ...MovieFields
        }
      }
      followers {
        _id
      }
      following {
        _id
      }
    }
  `,
);

export const USER = appendGql(
  USER_FIELDS,
  gql`
    query ($userId: String!) {
      user(UserId: $userId) {
        ...UserFields
      }
    }
  `,
);

export const ALL_USERS = appendGql(
  USER_FIELDS,
  gql`
    query users {
      users {
        ...UserFields
      }
    }
  `,
);

export const ALL_USERS_ID = gql`
  query users {
    users {
      _id
    }
  }
`;

export const SIGN_IN = appendGql(
  USER_FIELDS,
  gql`
    mutation ($username: String!) {
      userLogin(username: $username) {
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

export const ADD_MOVIE_INFO = appendGql(
  USER_FIELDS,
  gql`
    mutation ($data: MovieInfoInput!) {
      userAddMovieInfo(data: $data) {
        ...UserFields
      }
    }
  `,
);

export const UPDATE_USER = appendGql(
  USER_FIELDS,
  gql`
    mutation ($data: UserInput!, $userId: String!) {
      updateUser(data: $data, userId: $userId) {
        ...UserFields
      }
    }
  `,
);
