import { gql } from '@apollo/client';

export const FIND_MOVIE = gql`
  query FindMovie($movieId: Int!) {
    movie(movieId: $movieId) {
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
      }
    }
  }
`;

export const FIND_MOVIE_WITH_CREDITS = gql`
  query FindMovieWithCredits($movieId: Int!) {
    movieWithCredits(movieId: $movieId) {
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
      }
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
  query SearchMovie($page: Int!, $searchTerm: String!) {
    searchMovie(page: $page, searchTerm: $searchTerm) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          releaseDate
          posterUrl
        }
      }
    }
  }
`;

export const FIND_TRENDING_MOVIES = gql`
  query FindTrendingMovies($page: Int!) {
    trendingMovies(page: $page) {
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;

export const FIND_MOVIE_RECOMMENDATIONS = gql`
  query FindMovieRecommendations($page: Int!, $movieId: Int!) {
    movieRecommendations(page: $page, movieId: $movieId) {
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;

export const DISCOVER_MOVIES = gql`
  query DiscoverMovies($page: Int!, $sort: TmDBMovieSortInput) {
    discoverMovies(page: $page, sort: $sort) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          originalTitle
          posterUrl
        }
      }
    }
  }
`;
