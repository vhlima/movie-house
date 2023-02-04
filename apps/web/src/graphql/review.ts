import { gql } from '@apollo/client';

export const FIND_REVIEW = gql`
  query FindReview($postId: Int!) {
    review(postId: $postId) {
      id
      isPinned
      user {
        username
        profilePictureUrl
      }
      post {
        id
        body
        createdAt
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
  }
`;

const BASIC_REVIEW_FIELDS = gql`
  fragment BasicReviewFields on Review {
    id
    user {
      username
      profilePictureUrl
    }
    post {
      id
      body
      createdAt
    }
    movie {
      id
      originalTitle
      posterUrl
      releaseDate
    }
  }
`;

export const FIND_USER_RECENT_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindUserRecentReviews($userId: String!) {
    reviewsUserRecent(userId: $userId) {
      ...BasicReviewFields
    }
  }
`;

export const FIND_USER_POPULAR_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindUserPopularReviews($userId: String!) {
    reviewsUserPopular(userId: $userId) {
      ...BasicReviewFields
    }
  }
`;

export const FIND_USER_PINNED_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindUserPinnedReviews($userId: String!) {
    reviewsUserPinned(userId: $userId) {
      ...BasicReviewFields
      isPinned
    }
  }
`;

export const FIND_USER_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindUserReviews($userId: String!, $sort: ReviewSortInput) {
    reviewsUser(userId: $userId, sort: $sort) {
      ...BasicReviewFields
      isPinned
      movie {
        releaseDate
      }
    }
  }
`;

export const FIND_RECENT_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindRecentReviews {
    reviewsRecent {
      ...BasicReviewFields
    }
  }
`;

export const FIND_MOVIE_POPULAR_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindPopularReviewsFromMovie($movieId: Int!) {
    reviewsPopularFromMovie(movieId: $movieId) {
      ...BasicReviewFields
    }
  }
`;

export const FIND_MOVIE_RECENT_REVIEWS = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindMovieRecentReviews($movieId: Int!) {
    reviewsRecentFromMovie(movieId: $movieId) {
      ...BasicReviewFields
    }
  }
`;

export const FIND_POPULAR_REVIEWS_WEEK = gql`
  ${BASIC_REVIEW_FIELDS}

  query FindPopularReviewsWeek {
    reviewsPopularWeek {
      ...BasicReviewFields
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($body: String!, $movieId: Int!) {
    reviewCreate(body: $body, movieId: $movieId) {
      post {
        id
      }
    }
  }
`;

export const PIN_REVIEW = gql`
  ${BASIC_REVIEW_FIELDS}

  mutation PinReview($postId: Int!) {
    reviewPin(postId: $postId) {
      ...BasicReviewFields
      isPinned
    }
  }
`;

export const UNPIN_REVIEW = gql`
  ${BASIC_REVIEW_FIELDS}

  mutation UnpinReview($postId: Int!) {
    reviewUnpin(postId: $postId) {
      ...BasicReviewFields
      isPinned
    }
  }
`;
