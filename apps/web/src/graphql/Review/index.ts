import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

import { USER_FIELDS } from '../User';

import { MOVIE_FIELDS } from '../Movie';

const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    body
    commentaryCount
    createdAt
    likes {
      user {
        id
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

export const FIND_REVIEW = appendGql(
  REVIEW_FIELDS,
  USER_FIELDS,
  MOVIE_FIELDS,
  gql`
    query FindReview($reviewId: String!) {
      review(reviewId: $reviewId) {
        ...ReviewFields
        author {
          ...UserFields
        }
        movie {
          ...MovieFields
        }
      }
    }
  `,
);

export const FIND_REVIEWS = gql`
  query FindReviews($userId: String!) {
    reviews(userId: $userId) {
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
        posterUrl
        releaseDate
      }
    }
  }
`;

export const FIND_LATEST_REVIEWS = appendGql(
  REVIEW_FIELDS,
  USER_FIELDS,
  MOVIE_FIELDS,
  gql`
    query FindLatestReviews($userId: String!) {
      latestReviews(userId: $userId) {
        ...ReviewFields
        author {
          ...UserFields
        }
        movie {
          ...MovieFields
        }
      }
    }
  `,
);

export const FIND_PINNED_REVIEWS = gql`
  query FindPinnedReviews($userId: String!) {
    pinnedReviews(userId: $userId) @connection(key: "pinnedReviews") {
      id
      body
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
        posterUrl
        releaseDate
      }
    }
  }
`;

export const PIN_REVIEW = gql`
  mutation PinReview($reviewId: String!) {
    pinReview(reviewId: $reviewId) {
      id
      movie {
        id
        originalTitle
        posterUrl
        releaseDate
      }
    }
  }
`;

export const UNPIN_REVIEW = gql`
  mutation UnpinReview($reviewId: String!) {
    unpinReview(reviewId: $reviewId) {
      id
      movie {
        id
        originalTitle
        posterUrl
        releaseDate
      }
    }
  }
`;
