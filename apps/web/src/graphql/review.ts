import { gql } from '@apollo/client';

const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    body
    pinned
    commentaryCount
    createdAt
    likes {
      user {
        id
      }
    }
    author {
      id
      username
      profilePictureUrl
    }
    movie {
      id
      originalTitle
      runtime
      posterUrl
      backdropUrl
      releaseDate
      credits {
        crew {
          department
          originalName
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($body: String!, $movieId: Int!) {
    createReview(body: $body, movieId: $movieId) {
      id
    }
  }
`;

export const FIND_REVIEW = gql`
  ${REVIEW_FIELDS}

  query FindReview($reviewId: String!) {
    review(reviewId: $reviewId) {
      ...ReviewFields
    }
  }
`;

export const FIND_USER_REVIEWS = gql`
  ${REVIEW_FIELDS}

  query FindUserReviews($userId: String!) {
    reviews(userId: $userId) {
      ...ReviewFields
    }
  }
`;

export const FIND_RECENT_REVIEWS = gql`
  query FindRecentReviews {
    recentReviews {
      id
      movie {
        id
        originalTitle
        posterUrl
      }
    }
  }
`;

export const FIND_POPULAR_REVIEWS_WEEK = gql`
  ${REVIEW_FIELDS}

  query FindPopularReviewsWeek {
    popularReviewsWeek {
      ...ReviewFields
    }
  }
`;

export const FIND_MOVIE_POPULAR_REVIEWS = gql`
  query FindMoviePopularReviews($movieId: Int!) {
    moviePopularReviews(movieId: $movieId) {
      id
      body
      commentaryCount
      author {
        username
        profilePictureUrl
      }
      likes {
        id
      }
    }
  }
`;

export const FIND_MOVIE_RECENT_REVIEWS = gql`
  query FindMovieRecentReviews($movieId: Int!) {
    movieRecentReviews(movieId: $movieId) {
      id
      body
      commentaryCount
      author {
        username
        profilePictureUrl
      }
      likes {
        id
      }
    }
  }
`;

export const PIN_REVIEW = gql`
  mutation PinReview($reviewId: String!) {
    pinReview(reviewId: $reviewId) {
      id
      body
      pinned
      commentaryCount
      createdAt
      likes {
        id
        user {
          id
          username
        }
      }
      author {
        id
        username
        profilePictureUrl
      }
      movie {
        id
        originalTitle
        posterUrl
        releaseDate
      }
    }
  }
`;
