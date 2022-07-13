import { gql } from '@apollo/client';

export const MOVIE_FIELDS = gql`
  fragment MovieFields on Movie {
    id
    imdb_id
    original_language
    original_title
    overview
    runtime
    vote_average
    poster_path
    backdrop_path
    release_date
    posterUrl
    backdropUrl
    genres {
      id
      name
    }
    production_companies {
      id
      name
      logo_path
    }
    spoken_languages {
      english_name
      iso_639_1
    }
  }
`;

export const GET_MOVIE = gql`
  ${MOVIE_FIELDS}

  query GetMovie($movieId: String!) {
    getMovie(movieId: $movieId) {
      ...MovieFields
    }
  }
`;

export const GET_MOVIE_CREDITS = gql`
  query ($movieId: String!) {
    getMovieCredits(movieId: $movieId) {
      cast {
        id
        character
        order
        original_name
        profilePictureUrl
      }
    }
  }
`;
