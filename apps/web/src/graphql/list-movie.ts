import { gql } from '@apollo/client';

export const FIND_USER_LIST_MOVIES = gql`
  query FindUserListMovies($listId: String!) {
    userListMovies(listId: $listId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_USER_PRE_MADE_LIST_MOVIES = gql`
  query FindUserPreMadeListMovies(
    $listType: PreMadeListType!
    $userId: String!
  ) {
    userPreMadeListMovies(listType: $listType, userId: $userId) {
      movie {
        id
        originalTitle
        posterUrl
      }
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

export const FIND_USER_PRE_MADE_LIST_MOVIES_BY_GENRE = gql`
  query FindUserPreMadeListMoviesByGenre(
    $listType: PreMadeListType!
    $genres: [Int!]!
    $userId: String!
  ) {
    userPreMadeListMoviesByGenre(
      listType: $listType
      genres: $genres
      userId: $userId
    ) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;
