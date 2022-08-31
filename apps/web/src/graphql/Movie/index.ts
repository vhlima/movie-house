import { gql } from '@apollo/client';
import { appendGql } from '../../utils';

export const MOVIE_FIELDS = gql`
  fragment MovieFields on Movie {
    id
    imdbId
    originalLanguage
    originalTitle
    overview
    runtime
    voteAverage
    releaseDate
    posterUrl
    backdropUrl
    genres {
      id
      name
    }
    productionCompanies {
      id
      name
      logoPath
    }
    spokenLanguages {
      englishName
      iso_639_1
    }
  }
`;

export const FIND_MOVIE = appendGql(
  MOVIE_FIELDS,
  gql`
    query FindMovie($movieId: Int!) {
      movie(movieId: $movieId) {
        ...MovieFields
      }
    }
  `,
);

export const FIND_FULL_MOVIE = appendGql(
  MOVIE_FIELDS,
  gql`
    query FindMovie($movieId: Int!) {
      movie(movieId: $movieId) {
        ...MovieFields
        credits {
          cast {
            id
            character
            originalName
            profilePictureUrl
          }
        }
      }
    }
  `,
);

export const SEARCH_MOVIE = gql`
  query SearchMovie($searchTerm: String!) {
    searchMovie(searchTerm: $searchTerm) {
      page
      results {
        id
        posterUrl
        originalTitle
        releaseDate
      }
    }
  }
`;
