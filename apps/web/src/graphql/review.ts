import { gql } from '@apollo/client';

export const FIND_REVIEW = gql`
  query FindReview($reviewId: String!) {
    review(reviewId: $reviewId) {
      id
      isPinned
      user {
        username
        profilePictureUrl
      }
      post {
        id
        content
        createdAt
      }
      movie {
        id
        originalTitle
        runtime
        posterUrl
        backdropUrl
        releaseDate
      }
    }
  }
`;

export const FIND_REVIEWS = gql`
  query FindReviews($sort: ReviewSortInput, $userId: String, $page: Int!) {
    reviews(sort: $sort, userId: $userId, page: $page) {
      totalCount
      totalPages
      itemsPerPage
      pageInfo {
        currentPage
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          id
          user {
            username
            profilePictureUrl
          }
          post {
            id
            content
            createdAt
          }
          movie {
            id
            originalTitle
            posterUrl
            releaseDate
          }
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($content: String!, $movieId: Int!) {
    createReview(content: $content, movieId: $movieId) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: String!) {
    deleteReview(reviewId: $reviewId)
  }
`;

export const TOGGLE_REVIEW_PIN = gql`
  mutation ToggleReviewPin($reviewId: String!) {
    toggleReviewPin(reviewId: $reviewId)
  }
`;
