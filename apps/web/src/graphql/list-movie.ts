import { gql } from '@apollo/client';

export const FIND_USER_LIST_MOVIES = gql`
  query FindUserListMovies($listId: String!) {
    userListMovies(listId: $listId) {
      id
      originalTitle
      posterUrl
    }
  }
`;

export const FIND_USER_PRE_MADE_LIST_MOVIES = gql`
  query FindUserPreMadeListMovies(
    $page: Int
    $sort: MovieSortInput
    $listType: PreMadeListType!
    $userId: String!
  ) {
    userPreMadeListMovies(
      page: $page
      sort: $sort
      listType: $listType
      userId: $userId
    ) {
      id
      originalTitle
      posterUrl
    }
  }
`;

export const IS_MOVIE_ON_PRE_MADE_LIST = gql`
  query IsMovieOnPreMadeList($listType: PreMadeListType!, $movieId: Int!) {
    isMovieOnPreMadeList(listType: $listType, movieId: $movieId)
  }
`;

export const IS_MOVIE_ON_LIST = gql`
  query IsMovieOnList($postId: Int!) {
    isMovieOnList(postId: $postId)
  }
`;
