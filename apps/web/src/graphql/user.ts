import { gql } from '@apollo/client';

import type { DocumentNode } from '@apollo/client';

import { MOVIE_FIELDS } from './movie';

const UserFields = gql`
  ${MOVIE_FIELDS}

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
`;

const userFieldsFragmentBuilder = (doc: DocumentNode) => gql`
  ${UserFields}

  ${doc}
`;

export const USER = userFieldsFragmentBuilder(gql`
  query ($userId: String!) {
    user(UserId: $userId) {
      ...UserFields
    }
  }
`);

export const ALL_USERS = userFieldsFragmentBuilder(gql`
  query users {
    users {
      ...UserFields
    }
  }
`);

export const ALL_USERS_ID = gql`
  query users {
    users {
      _id
    }
  }
`;

export const SIGN_IN = userFieldsFragmentBuilder(gql`
  mutation ($username: String!) {
    userLogin(username: $username) {
      ...UserFields
    }
  }
`);

export const ADD_FAVORITE_MOVIE = userFieldsFragmentBuilder(gql`
  mutation ($movieId: String!, $userId: String!) {
    userAddFavoriteMovie(movieId: $movieId, userId: $userId) {
      ...UserFields
    }
  }
`);

export const REMOVE_FAVORITE_MOVIE = userFieldsFragmentBuilder(gql`
  mutation ($movieId: String!, $userId: String!) {
    userRemoveFavoriteMovie(movieId: $movieId, userId: $userId) {
      ...UserFields
    }
  }
`);

export const CREATE_REVIEW = gql`
  mutation ($body: String!, $movieId: String!, $userId: String!) {
    createReview(body: $body, movieId: $movieId, userId: $userId) {
      _id
    }
  }
`;

export const GET_REVIEW = gql`
  query ($reviewId: String!) {
    getReview(reviewId: $reviewId) {
      _id
      body
      movie {
        original_title
        release_date
        backdropUrl
        posterUrl
      }
    }
  }
`;

export const ADD_MOVIE_INFO = userFieldsFragmentBuilder(gql`
  mutation ($data: MovieInfoInput!) {
    userAddMovieInfo(data: $data) {
      ...UserFields
    }
  }
`);

export const UPDATE_USER = userFieldsFragmentBuilder(gql`
  mutation ($data: UserInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      ...UserFields
    }
  }
`);
