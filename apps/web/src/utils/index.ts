import { DocumentNode, gql } from '@apollo/client';

export const appendGql = (...docs: DocumentNode[]) => gql`
  ${docs.map(doc => doc)}
`;
