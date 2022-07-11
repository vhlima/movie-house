import { PropsWithChildren } from 'react';

import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from './useAuth';

import client from '../api';

const Hooks: React.FC<PropsWithChildren> = ({ children }) => (
  <ApolloProvider client={client}>
    <AuthProvider>{children}</AuthProvider>
  </ApolloProvider>
);

export default Hooks;
