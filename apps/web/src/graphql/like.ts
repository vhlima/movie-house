import { gql } from '@apollo/client';

export const LIKE_OR_DISLIKE = gql`
  mutation LikeOrDislike($likeType: LikeType!, $contentId: String!) {
    likeOrDislike(likeType: $likeType, contentId: $contentId)
  }
`;
