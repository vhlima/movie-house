import type { AppProps } from 'next/app';

import Hooks from '../hooks';

import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Hooks>
    <Component {...pageProps} />
  </Hooks>
);

export default MyApp;
