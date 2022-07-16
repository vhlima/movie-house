import { gql } from '@apollo/client';

// TODO maybe we dont need to return nothing from like method

export const LIKE_OR_DISLIKE = gql`
  mutation ($userId: String!, $referenceId: String!, $likeType: LikeType!) {
    likeOrDislike(
      userId: $userId
      referenceId: $referenceId
      likeType: $likeType
    )
  }
`;
