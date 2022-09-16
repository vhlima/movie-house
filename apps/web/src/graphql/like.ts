import { gql } from '@apollo/client';

export const LIKE_CONTENT = gql`
  mutation LikeContent($rootId: String!, $referenceId: String) {
    like(rootId: $rootId, referenceId: $referenceId)
  }
`;
