import { useMemo } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  from,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

import { mergeDeep } from '@apollo/client/utilities';

import { setContext } from '@apollo/client/link/context';

import { getSession } from 'next-auth/react';

import { isEqual } from 'lodash';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient;

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/', // change that to api url on env
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();

  return {
    headers: {
      ...headers,

      authorization: session ? `Bearer ${session}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export default new ApolloClient({
  uri: 'http://localhost:4000/',

  cache: new InMemoryCache(),

  link: authLink.concat(httpLink),
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });
}

/* eslint-disable no-underscore-dangle */
export function initializeApollo(
  initialState = null,
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = mergeDeep(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

/* eslint-disable no-param-reassign */
export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    return {
      ...pageProps,
      props: {
        ...pageProps.props,
        [APOLLO_STATE_PROP_NAME]: client.cache.extract(),
      },
    };
  }

  return pageProps;
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];

  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
