import { DocumentNode, gql } from '@apollo/client';

// TODO change that

export const appendGql = (...docs: DocumentNode[]) => gql`
    # ${docs.map(doc => `${doc}`)}

    ${docs[0]}
    ${docs[1]}

    ${docs.length > 2 ? docs[2] : ''}

    ${docs.length > 3 ? docs[3] : ''}
  `;

export const formatNumberToLargeScale = (num: number): string => {
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  let decimal = 0;

  for (let i = units.length - 1; i >= 0; i -= 1) {
    decimal = 1000 ** (i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(1) + units[i];
    }
  }

  return String(num);
};
