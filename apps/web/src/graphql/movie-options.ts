import { gql } from '@apollo/client';

export const FIND_MOVIE_OPTIONS = gql`
  query FindMovieOptions($movieId: Int!, $userId: String!, $rootId: String!) {
    movieRating(movieId: $movieId, userId: $userId) {
      rating
    }

    isOnWatchLater: isMovieOnPremadeList(
      movieId: $movieId
      listType: WATCH_LATER
      userId: $userId
    )

    hasUserLike(rootId: $rootId, userId: $userId)

    isOnWatchList: isMovieOnPremadeList(
      movieId: $movieId
      listType: WATCHLIST
      userId: $userId
    )
  }
`;

// @connection(key: "isOnWatchList", filter: ["userId", "movieId"])
