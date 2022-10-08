import { gql } from '@apollo/client';

export const ADD_MOVIE_TO_CUSTOM_LIST = gql`
  mutation AddMovieToCustomList($movieId: Int!, $listId: String!) {
    addMovieToCustomList(movieId: $movieId, listId: $listId) {
      movie {
        originalTitle
      }
    }
  }
`;

export const FIND_USER_LISTS = gql`
  query FindUserLists($userId: String!) {
    userLists(userId: $userId) {
      id
      name
    }
  }
`;

export const FIND_USER_LISTS_FULL = gql`
  query FindUserListsFull($userId: String!) {
    userLists(userId: $userId) {
      name
      body
      movies {
        originalTitle
        posterUrl
      }
    }
  }
`;

export const CREATE_USER_LIST = gql`
  mutation CreateUserList($body: String!, $name: String!) {
    createUserList(body: $body, name: $name) {
      id
      name
    }
  }
`;
