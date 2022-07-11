import { gql } from '@apollo/client';

export const GET_MOVIE = gql`
  query GetMovie($movieId: String!) {
    getMovie(movieId: $movieId) {
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
  }
`;

export const GET_MOVIE_CREDITS = gql`
  query ($movieId: String!) {
    getMovieCredits(movieId: $movieId) {
      cast {
        character
        order
        original_name
        profilePictureUrl
      }
    }
  }
`;
