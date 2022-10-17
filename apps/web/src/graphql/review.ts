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

export const FIND_USER_RECENT_REVIEWS = gql`
  ${REVIEW_FIELDS}

  query FindUserRecentReviews($userId: String!) {
    recentReviews(userId: $userId) {
      ...ReviewFields
    }
  }
`;

export const FIND_USER_PINNED_REVIEWS = gql`
  ${REVIEW_FIELDS}

  query FindUserPinnedReviews($userId: String!) {
    pinnedReviews(userId: $userId)
      @connection(key: "pinnedReviews", filter: ["userId"]) {
      ...ReviewFields
    }
  }
`;

export const FIND_USER_POPULAR_REVIEWS = gql`
  ${REVIEW_FIELDS}

  query FindUserPopularReviews($userId: String!) {
    popularReviews(userId: $userId) {
      ...ReviewFields
    }
  }
`;
