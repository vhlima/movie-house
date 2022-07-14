import { DocumentNode, gql } from '@apollo/client';

// TODO change that

export const appendGql = (...docs: DocumentNode[]) => gql`
    # ${docs.map(doc => `${doc}`)}

    ${docs[0]}
    ${docs[1]}
  `;
