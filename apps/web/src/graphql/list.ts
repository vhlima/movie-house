import { gql } from '@apollo/client';

export const FIND_USER_LISTS_NAMES = gql`
  query FindUserListsNames($userId: String!) {
    userListNames(userId: $userId) {
      id
      name
    }
  }
`;

export const FIND_LISTS = gql`
  query FindLists($page: Int!, $userId: String, $sort: ListSortInput) {
    lists(page: $page, userId: $userId, sort: $sort) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          name
          movieCount
          isPrivate
          post {
            id
            content
          }
          user {
            username
            profilePictureUrl
          }
          movies {
            id
            originalTitle
            posterUrl
          }
        }
      }
    }
  }
`;

export const FIND_LIST = gql`
  query FindList($listId: String!) {
    list(listId: $listId) {
      id
      name
      movieCount
      backgroundImageUrl
      user {
        username
        profilePictureUrl
      }
      post {
        id
        content
        createdAt
      }
    }
  }
`;

export const FIND_LIST_MOVIES = gql`
  query FindListMovies($page: Int!, $listId: String!) {
    listMovies(page: $page, listId: $listId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($listName: String!, $content: String) {
    createList(listName: $listName, content: $content) {
      id
      name
    }
  }
`;

export const DELETE_LIST = gql`
  mutation DeleteList($listId: String!) {
    deleteList(listId: $listId)
  }
`;

export const ADD_MOVIE_TO_LIST = gql`
  mutation AddMovieToList($movieId: Int!, $listId: String!) {
    addMovieToList(movieId: $movieId, listId: $listId) {
      originalTitle
    }
  }
`;

export const REMOVE_MOVIE_FROM_LIST = gql`
  mutation RemoveMovieFromList($movieId: Int!, $listId: String!) {
    removeMovieFromList(movieId: $movieId, listId: $listId)
  }
`;
