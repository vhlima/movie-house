import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { SessionProvider } from 'next-auth/react';

import type { SessionProviderProps } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import type { AppProps } from 'next/app';

import Hooks from '@/hooks';
import { useApollo } from '../client';

import Layout from '../Layout';

import '../styles/globals.css';

const MyApp = ({
  Component,
  pageProps,
  session,
}: AppProps & SessionProviderProps) => {
  const apolloClient = useApollo(pageProps);

  const { events } = useRouter();

  useEffect(() => {
    events.on('routeChangeStart', () => apolloClient.clearStore());

    return () => {
      events.off('routeChangeStart', () => apolloClient.clearStore());
    };
  }, []);

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
