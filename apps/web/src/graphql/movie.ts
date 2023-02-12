import { gql } from '@apollo/client';

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
      iso6391
    }
  }
`;

export const FIND_MOVIE = gql`
  ${MOVIE_FIELDS}

  query FindMovie($movieId: Int!) {
    movie(movieId: $movieId) {
      ...MovieFields
    }
  }
`;

export const FIND_FULL_MOVIE = gql`
  ${MOVIE_FIELDS}

  query FindFullMovie($movieId: Int!) {
    movie(movieId: $movieId) {
      ...MovieFields
      credits {
        cast {
          id
          character
          originalName
          profilePictureUrl
        }
        crew {
          id
          popularity
          department
          originalName
        }
      }
    }
  }
`;

export const SEARCH_MOVIE = gql`
  query SearchMovie($searchTerm: String!, $page: Int) {
    searchMovie(searchTerm: $searchTerm, page: $page) {
      page
      totalResults
      totalPages
      results {
        id
        posterUrl
        originalTitle
        releaseDate
      }
    }
  }
`;

export const FIND_TRENDING_MOVIES = gql`
  query FindTrendingMovies($page: Int!) {
    trendingMovies(page: $page) @connection(key: "trendingMovies") {
      page
      results {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_MOVIE_RECOMMENDATIONS = gql`
  query FindMovieRecommendations($movieId: Int!) {
    movieRecommendations(movieId: $movieId) {
      id
      originalTitle
      posterUrl
    }
  }
`;

export const FIND_MOVIES = gql`
  query FindMovies($page: Int, $sort: MovieSortInput) {
    movies(page: $page, sort: $sort) {
      page
      totalPages
      totalResults
      results {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;
