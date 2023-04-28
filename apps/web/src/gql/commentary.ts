import { gql } from '@apollo/client';

export const FIND_COMMENTARIES = gql`
  query FindCommentaries($page: Int!, $postId: String!) {
    commentaries(page: $page, postId: $postId)
      @connection(key: "commentaries") {
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
          content
          replyCount
          createdAt
          updatedAt
          user {
            username
            profilePictureUrl
          }
        }
      }
    }
  }
`;

export const CREATE_COMMENTARY = gql`
  mutation CreateCommentary($content: String!, $postId: String!) {
    createCommentary(content: $content, postId: $postId) {
      id
      content
      replyCount
      createdAt
      updatedAt
      user {
        username
        profilePictureUrl
      }
    }
  }
`;

export const DELETE_COMMENTARY = gql`
  mutation DeleteCommentary($commentaryId: String!) {
    deleteCommentary(commentaryId: $commentaryId)
  }
`;
