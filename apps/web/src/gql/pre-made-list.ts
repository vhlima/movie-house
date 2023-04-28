import { gql } from '@apollo/client';

export const FIND_PRE_MADE_LIST_MOVIES = gql`
  query FindPreMadeListMovies(
    $page: Int!
    $listType: PreMadeListType!
    $userId: String!
    $sort: MovieReferenceSortInput
  ) {
    preMadeListMovies(
      page: $page
      listType: $listType
      userId: $userId
      sort: $sort
    ) {
      totalCount
      totalPages
      itemsPerPage
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

export const ADD_MOVIE_TO_PRE_MADE_LIST = gql`
  mutation AddMovieToPreMadeList($movieId: Int!, $listType: PreMadeListType!) {
    addMovieToPreMadeList(movieId: $movieId, listType: $listType) {
      id
      originalTitle
      posterUrl
    }
  }
`;

export const REMOVE_MOVIE_FROM_PRE_MADE_LIST = gql`
  mutation RemoveMovieFromPreMadeList(
    $movieId: Int!
    $listType: PreMadeListType!
  ) {
    removeMovieFromPreMadeList(movieId: $movieId, listType: $listType)
  }
`;

export const IS_MOVIE_ON_PRE_MADE_LIST = gql`
  query IsMovieOnPreMadeList($movieId: Int!, $listType: PreMadeListType!) {
    isMovieOnPreMadeList(movieId: $movieId, listType: $listType)
  }
`;
