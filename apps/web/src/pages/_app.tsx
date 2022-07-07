import type { AppProps } from 'next/app';

import Hooks from '../hooks';

import Layout from '../Layout';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Hooks>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </Hooks>
);

export default MyApp;
