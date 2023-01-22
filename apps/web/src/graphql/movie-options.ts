import { gql } from '@apollo/client';

// export const FIND_MOVIE_OPTIONS = gql`
//   query FindMovieOptions($movieId: Int!, $userId: String!, $rootId: String!) {
//     isOnWatchLater: isMovieOnUserPreMadeList(
//       movieId: $movieId
//       listType: WATCH_LATER
//     )

//     hasUserLike(rootId: $rootId, userId: $userId)

//     isOnWatchList: isMovieOnUserPreMadeList(
//       movieId: $movieId
//       listType: WATCHLIST
//     )
//   }
// `;

// @connection(key: "isOnWatchList", filter: ["userId", "movieId"])
