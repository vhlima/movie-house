import { gql } from '@apollo/client';

export const FIND_STREAMING_PROVIDERS = gql`
  query FindStreamingProviders {
    streamingProviders {
      id
      name
    }
  }
`;
