import { gql } from '@apollo/client';
import { appendGql } from '../../utils';

const FAVORITE_MOVIE_FIELDS = gql`
  fragment FavoriteMovieFields on FavoriteMovie {
    id
    movie {
      id
      originalTitle
      posterUrl
    }
  }
`;

export const FIND_FAVORITE_MOVIES = appendGql(
  FAVORITE_MOVIE_FIELDS,
  gql`
    query findFavoriteMovies($userId: ID!) {
      favoriteMovies(userId: $userId) @connection(key: "favoriteMovies") {
        ...FavoriteMovieFields
      }
    }
  `,
);

export const ADD_FAVORITE_MOVIE = appendGql(
  FAVORITE_MOVIE_FIELDS,
  gql`
    mutation addFavoriteMovie($movieId: Int!) {
      addFavoriteMovie(movieId: $movieId) {
        ...FavoriteMovieFields
      }
    }
  `,
);

export const REMOVE_FAVORITE_MOVIE = gql`
  mutation removeFavoriteMovie($movieId: Int!) {
    removeFavoriteMovie(movieId: $movieId)
  }
`;
