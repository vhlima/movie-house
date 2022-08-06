import { gql } from '@apollo/client';

import { appendGql } from '../utils';

const REPLY_FIELDS = gql`
  fragment ReplyFields on Reply {
    _id
    body
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

export const REPLIES = appendGql(
  REPLY_FIELDS,
  gql`
    query ($commentaryId: ID!) {
      replies(commentaryId: $commentaryId) {
        ...ReplyFields
      }
    }
  `,
);

export const REPLY = appendGql(
  REPLY_FIELDS,
  gql`
    mutation ($body: String!, $commentaryId: ID!, $userId: ID!) {
      reply(body: $body, commentaryId: $commentaryId, userId: $userId) {
        ...ReplyFields
      }
    }
  `,
);
