import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  if (typeof window === 'undefined') {
    return { headers };
  }

  // get the authentication token from local storage if it exists

  const token = localStorage.getItem('@MovieHouse:token');

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export default new ApolloClient({
  uri: 'http://localhost:4000/',

  cache: new InMemoryCache(),

  link: authLink.concat(httpLink),
});
