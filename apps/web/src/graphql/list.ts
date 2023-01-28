import { gql } from '@apollo/client';

export const FIND_USER_LIST_NAMES = gql`
  query FindUserListNames($userId: String!) {
    userLists(userId: $userId) {
      id
      name
    }
  }
`;

export const FIND_USER_LISTS = gql`
  query FindUserLists($userId: String!) {
    userLists(userId: $userId) {
      name
      isPrivate
      user {
        id
        username
        profilePictureUrl
      }
      post {
        id
        body
      }
      movies {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_USER_LIST = gql`
  query FindUserList($postId: Int!) {
    userList(postId: $postId) {
      id
      name
      backgroundImageUrl
      user {
        id
        username
        profilePictureUrl
      }
      post {
        id
        body
        createdAt
      }
    }
  }
`;

export const FIND_MOVIE_POPULAR_LISTS = gql`
  query FindMoviePopularLists($movieId: Int!) {
    moviePopularLists(movieId: $movieId) {
      id
      name
      backgroundImageUrl
      user {
        id
        username
        profilePictureUrl
      }
      post {
        id
        body
        createdAt
      }
      movies {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const CREATE_USER_LIST = gql`
  mutation CreateUserList($name: String!, $body: String) {
    userListCreate(name: $name, body: $body) {
      id
      name
    }
  }
`;

export const DELETE_USER_LIST = gql`
  mutation DeleteUserList($listId: String!) {
    userListDelete(listId: $listId)
  }
`;

export const ADD_MOVIE_TO_LIST = gql`
  mutation AddMovieToList($movieId: Int!, $listId: String!) {
    userListAddMovie(movieId: $movieId, listId: $listId) {
      movie {
        originalTitle
      }
    }
  }
`;

export const REMOVE_MOVIE_FROM_LIST = gql`
  mutation RemoveMovieFromList($movieId: Int!, $listId: String!) {
    userListRemoveMovie(movieId: $movieId, listId: $listId)
  }
`;
