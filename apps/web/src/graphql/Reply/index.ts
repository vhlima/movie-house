import { gql } from '@apollo/client';

import { appendGql } from '../../utils';

const REPLY_FIELDS = gql`
  fragment ReplyFields on Reply {
    id
    body
    likeCount
    createdAt
    updatedAt
    user {
      id
      username
      profilePictureUrl
    }
  }
`;

export const FIND_REPLIES = appendGql(
  REPLY_FIELDS,
  gql`
    query FindReplies($first: Int!, $commentaryId: String!, $after: String) {
      replies(first: $first, commentaryId: $commentaryId, after: $after)
        @connection(key: "replies", filter: ["commentaryId"]) {
        pageInfo {
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
  `,
);

export const ADD_REPLY = appendGql(
  REPLY_FIELDS,
  gql`
    mutation AddReply($body: String!, $commentaryId: String!) {
      reply(body: $body, commentaryId: $commentaryId) {
        ...ReplyFields
      }
    }
  `,
);

export const DELETE_REPLY = gql`
  mutation DeleteReply($replyId: String!) {
    deleteReply(replyId: $replyId)
  }
`;
