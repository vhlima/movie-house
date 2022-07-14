import { gql } from '@apollo/client';

import { appendGql } from '../utils';

import { MOVIE_FIELDS } from './movie';

export const CREATE_REVIEW = gql`
  mutation ($data: ReviewInput!, $movieId: String!, $userId: String!) {
    createReview(data: $data, movieId: $movieId, userId: $userId) {
      _id
      body
    }
  }
`;

export const REVIEW = appendGql(
  MOVIE_FIELDS,
  gql`
    query ($reviewId: String!) {
      review(reviewId: $reviewId) {
        _id
        body
        movie {
          ...MovieFields
        }
      }
    }
  `,
);
