import { gql } from '@apollo/client';

export const ADD_MOVIE_TO_CUSTOM_LIST = gql`
  mutation AddMovieToCustomList($movieId: Int!, $listId: String!) {
    addMovieToUserCustomList(movieId: $movieId, listId: $listId) {
      movie {
        originalTitle
      }
    }
  }
`;

export const FIND_USER_LISTS = gql`
  query FindUserListsCustom($userId: String!) {
    userListsCustom(userId: $userId) {
      id
      name
    }
  }
`;

export const FIND_USER_LISTS_FULL = gql`
  query FindUserListsFull($userId: String!) {
    userListsCustom(userId: $userId) {
      id
      name
      body
      totalCount
      author {
        id
        username
        profilePictureUrl
      }
      featuredMovies {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_USER_LIST = gql`
  query FindUserList($listId: String!) {
    userListCustom(listId: $listId) {
      id
      name
      body
      backgroundImageUrl
      author {
        id
        username
        profilePictureUrl
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

export const FIND_USER_LIST_CUSTOM_MOVIES = gql`
  query FindUserListCustomMovies($offset: Int, $first: Int!, $listId: String!) {
    userListCustomMovies(offset: $offset, first: $first, listId: $listId) {
      pageInfo {
        totalCount
        maxPages
        hasNextPage
      }
      edges {
        node {
          movie {
            id
            originalTitle
            posterUrl
          }
        }
      }
    }
  }
`;
