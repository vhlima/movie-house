import { DocumentNode } from '@apollo/client';

import { faker } from '@faker-js/faker';

type ApolloRequestMock<T, V> = {
  request: {
    query: DocumentNode;
    variables: V;
  };
  result: {
    data: T;
  };
};

export function mockApolloRequest<T, V>(
  props: ApolloRequestMock<T, V>,
): ApolloRequestMock<T, V> {
  return props;
}
