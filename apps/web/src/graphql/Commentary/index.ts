import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

export const COMMENTARY_FIELDS = gql`
  fragment CommentaryFields on Commentary {
    id
    postId
    body
    replyCount
    createdAt
    updatedAt
    user {
      id
      username
      profilePictureUrl
    }
    likes {
      user {
        id
      }
    }
  }
`;

export const FIND_COMMENTARIES = appendGql(
  COMMENTARY_FIELDS,
  gql`
    query FindCommentaries($first: Int!, $postId: String!, $after: String) {
      commentaries(first: $first, postId: $postId, after: $after)
        @connection(key: "commentaries") {
        pageInfo {
          maxItems
          hasNextPage
          endCursor
        }

        edges {
          node {
            ...CommentaryFields
          }
        }
      }
    }
  `,
);

export const ADD_COMMENTARY = appendGql(
  COMMENTARY_FIELDS,
  gql`
    mutation AddCommentary($body: String!, $postId: String!) {
      comment(body: $body, postId: $postId) {
        ...CommentaryFields
      }
    }
  `,
);

export const DELETE_COMMENTARY = gql`
  mutation DeleteCommentary($commentaryId: String!) {
    deleteCommentary(commentaryId: $commentaryId)
  }
`;
