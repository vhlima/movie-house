import { gql } from '@apollo/client';

export const FIND_LIMIT = gql`
  query FindLimit($limitType: LimitType!) {
    limit(limitType: $limitType) {
      limit
    }
  }
`;
