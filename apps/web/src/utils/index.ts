import { DocumentNode, gql } from '@apollo/client';

// TODO change that

export const appendGql = (...docs: DocumentNode[]) => gql`
    # ${docs.map(doc => `${doc}`)}

    ${docs[0]}
    ${docs[1]}

    ${docs.length > 2 ? docs[2] : ''}

    ${docs.length > 3 ? docs[3] : ''}
  `;
