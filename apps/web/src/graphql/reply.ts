import { gql } from '@apollo/client';

export const FIND_REPLIES = gql`
  query FindReplies($page: Int!, $commentaryId: String!) {
    replies(page: $page, commentaryId: $commentaryId) {
      totalCount
      totalPages
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          commentaryId
          content
          createdAt
          user {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation CreateReply($content: String!, $commentaryId: String!) {
    createReply(content: $content, commentaryId: $commentaryId) {
      id
      commentaryId
      content
      createdAt
      user {
        username
        profilePictureUrl
      }
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation DeleteReply($replyId: String!) {
    deleteReply(replyId: $replyId)
  }
`;
