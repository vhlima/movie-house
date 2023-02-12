import { gql } from '@apollo/client';

export const FIND_STREAM_PROVIDERS = gql`
  query FindStreamProviders {
    streamProviders {
      id
      name
    }
  }
`;
