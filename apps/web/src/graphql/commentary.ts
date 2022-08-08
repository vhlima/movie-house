import { gql } from '@apollo/client';

import { appendGql } from '../utils';

export const COMMENTARY_FIELDS = gql`
  fragment CommentaryFields on Commentary {
    _id
    postId
    body
    replyCount
    likeCount
    createdAt
    updatedAt
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
    query ($page: Int!, $postId: ID!) {
      commentaries(page: $page, postId: $postId) {
        currentPage
        hasNextPage
        commentaries {
          ...CommentaryFields
        }
      }
    }
  `,
);

export const COMMENT = appendGql(
  COMMENTARY_FIELDS,
  gql`
    mutation ($body: String!, $postId: ID!, $userId: ID!) {
      comment(body: $body, postId: $postId, userId: $userId) {
        ...CommentaryFields
      }
    }
  `,
);

export const DELETE_COMMENTARY = gql`
  mutation ($commentaryId: String!) {
    deleteCommentary(commentaryId: $commentaryId)
  }
`;
