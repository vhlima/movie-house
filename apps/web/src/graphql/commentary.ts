import { gql } from '@apollo/client';

export const COMMENTARY_FIELDS = gql`
  fragment CommentaryFields on Commentary {
    id
    postId
    body
    replyCount
    createdAt
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

export const FIND_COMMENTARIES = gql`
  ${COMMENTARY_FIELDS}

  query FindCommentaries($first: Int!, $postId: Int!, $after: String) {
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
`;

export const ADD_COMMENTARY = gql`
  ${COMMENTARY_FIELDS}
  mutation AddCommentary($body: String!, $postId: Int!) {
    comment(body: $body, postId: $postId) {
      ...CommentaryFields
    }
  }
`;

export const DELETE_COMMENTARY = gql`
  mutation DeleteCommentary($commentaryId: String!) {
    deleteCommentary(commentaryId: $commentaryId)
  }
`;
