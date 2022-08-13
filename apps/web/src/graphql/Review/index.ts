import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

import { USER_FIELDS } from '../User';

import { MOVIE_FIELDS } from '../Movie';

export const CREATE_REVIEW = gql`
  mutation CreateReview($body: String!, $movieId: Int!) {
    createReview(body: $body, movieId: $movieId) {
      id
    }
  }
`;

export const FIND_REVIEW = appendGql(
  USER_FIELDS,
  MOVIE_FIELDS,
  gql`
    query FindReview($reviewId: String!) {
      review(reviewId: $reviewId) {
        id
        body
        likeCount
        commentaryCount
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
