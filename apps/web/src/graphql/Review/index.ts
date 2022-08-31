import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

import { USER_FIELDS } from '../User';

import { MOVIE_FIELDS } from '../Movie';

const REVIEW_FIELDS = gql`
  fragment ReviewFields on Review {
    id
    body
    likeCount
    commentaryCount
    createdAt
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
