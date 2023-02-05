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

import type { IncomingHttpHeaders } from 'http';

import { isEqual } from 'lodash';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // if (process.env.NODE_ENV === 'development') {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
  // } else {
  // console.log('[Error Link] Unexpected error occurred');
  // }
});

function createApolloClient(headers?: IncomingHttpHeaders) {
  console.log(`create apollo client? ${headers?.cookie}`);

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([
      errorLink,
      createHttpLink({
        uri: process.env.NEXT_PUBLIC_API_URL,
        credentials: 'include',
        headers: {
          // SameSite: 'None',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Origin': '*',
          ...(headers && headers.cookie ? { Cookie: headers.cookie } : {}),
        },
        fetchOptions: {
          credentials: 'include',
        },
      }),
    ]),
    connectToDevTools: process.env.NODE_ENV === 'development',
    cache: new InMemoryCache(),
    credentials:
      process.env.NODE_ENV === 'development' ? 'same-origin' : 'include',
  });
}

/* eslint-disable no-underscore-dangle */
export const initializeApollo = (
  headers?: IncomingHttpHeaders,
  initialState: NormalizedCacheObject | null = null,
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(headers);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = mergeDeep(initialState, existingCache, {
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
};

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any,
) => {
  /* eslint-disable no-param-reassign */
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(null, state), [state]);
  return store;
};
