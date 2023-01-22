import { gql } from '@apollo/client';

const REPLY_FIELDS = gql`
  fragment ReplyFields on Reply {
    id
    body
    createdAt
    user {
      id
      username
      profilePictureUrl
    }
    commentary {
      id
      postId
    }
    likes {
      user {
        id
      }
    }
  }
`;

export const FIND_REPLIES = gql`
  ${REPLY_FIELDS}

  query FindReplies($first: Int!, $commentaryId: String!, $after: String) {
    replies(first: $first, commentaryId: $commentaryId, after: $after)
      @connection(key: "replies", filter: ["commentaryId"]) {
      pageInfo {
        maxItems
        endCursor
        hasNextPage
      }

      edges {
        node {
          ...ReplyFields
        }
      }
    }
  }
`;

export const ADD_REPLY = gql`
  ${REPLY_FIELDS}

  mutation AddReply($body: String!, $commentaryId: String!) {
    reply(body: $body, commentaryId: $commentaryId) {
      ...ReplyFields
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation DeleteReply($replyId: String!) {
    deleteReply(replyId: $replyId)
  }
`;
