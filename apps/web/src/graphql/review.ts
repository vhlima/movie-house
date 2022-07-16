import { gql } from '@apollo/client';

import { appendGql } from '../utils';

import { MOVIE_FIELDS } from './movie';

import { USER_FIELDS } from './user';

import { COMMENTARY_FIELDS } from './commentary';

export const CREATE_REVIEW = gql`
  mutation ($data: ReviewInput!, $movieId: String!, $userId: String!) {
    createReview(data: $data, movieId: $movieId, userId: $userId) {
      _id
    }
  }
`;

export const REVIEW = appendGql(
  USER_FIELDS,
  MOVIE_FIELDS,
  COMMENTARY_FIELDS,
  gql`
    query ($reviewId: String!) {
      review(reviewId: $reviewId) {
        _id
        body
        likeCount
        commentaries {
          ...CommentaryFields
        }
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
