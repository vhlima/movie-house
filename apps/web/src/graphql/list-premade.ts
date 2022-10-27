import { gql } from '@apollo/client';

export const FIND_USER_FAVORITE_MOVIES = gql`
  query FindUserFavoriteMovies($userId: String!) {
    userFavoriteMovies(userId: $userId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const ADD_MOVIE_TO_PREMADE_LIST = gql`
  mutation AddMovieToPremadeList($movieId: Int!, $listType: UserListType!) {
    addMovieToUserList(movieId: $movieId, listType: $listType) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const REMOVE_MOVIE_FROM_PRREMADE_LIST = gql`
  mutation RemoveMovieFromPremadeList(
    $listType: UserListType!
    $movieId: Int!
  ) {
    removeMovieFromList(listType: $listType, movieId: $movieId)
  }
`;

export const FIND_USER_LIST_PREMADE_MOVIES = gql`
  query FindUserListPreMadeMovies(
    $first: Int!
    $listType: UserListType!
    $userId: String!
    $offset: Int
  ) {
    userListPreMadeMovies(
      first: $first
      listType: $listType
      userId: $userId
      offset: $offset
    )
      @connection(
        key: "userListPreMadeMovies"
        filter: ["userId", "listType"]
      ) {
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
