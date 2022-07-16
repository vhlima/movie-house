import { gql } from '@apollo/client';

import { appendGql } from '../utils';

export const COMMENTARY_FIELDS = gql`
  fragment CommentaryFields on Commentary {
    _id
    body
    commentaryType
    likeCount
    referenceId
    repliesCount
    user {
      _id
      username
      profilePicture
    }
  }
`;

export const COMMENTARIES = appendGql(
  COMMENTARY_FIELDS,
  gql`
    query ($referenceId: String!) {
      commentaries(referenceId: $referenceId) {
        ...CommentaryFields
      }
    }
  `,
);

export const COMMENT = appendGql(
  COMMENTARY_FIELDS,
  gql`
    mutation ($userId: String!, $referenceId: String!, $body: String!) {
      comment(userId: $userId, referenceId: $referenceId, body: $body) {
        ...CommentaryFields
      }
    }
  `,
);
