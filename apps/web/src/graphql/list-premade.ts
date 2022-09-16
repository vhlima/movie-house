import { gql } from '@apollo/client';

export const ADD_MOVIE_TO_PREMADE_LIST = gql`
  mutation AddMovieToPremadeList($movieId: Int!, $listType: UserListType!) {
    addMovieToList(movieId: $movieId, listType: $listType) {
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

export const FIND_USER_FAVORITE_MOVIES = gql`
  query FindUserFavoriteMovies($userId: String!) {
    favoriteMovies(userId: $userId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_USER_WATCHLIST_MOVIES = gql`
  query FindUserWatchlist($userId: String!) {
    watchlist(userId: $userId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_USER_WATCH_LATER_MOVIES = gql`
  query FindUserWatchLater($userId: String!) {
    watchLater(userId: $userId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_USER_WATCHED_MOVIES = gql`
  query FindUserWatchedMovies($userId: String!) {
    watched(userId: $userId) {
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;
