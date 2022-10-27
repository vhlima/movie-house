import { SessionProvider } from 'next-auth/react';

import type { SessionProviderProps } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import type { AppProps } from 'next/app';

import { useApollo } from '../client';

import Hooks from '../hooks';

import Layout from '../Layout';

import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps,
  session,
}: AppProps & SessionProviderProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <Hooks>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hooks>
      </ApolloProvider>
    </SessionProvider>
  );
};

export default MyApp;
