import React, { PropsWithChildren } from 'react';

import { ApolloProvider } from '@apollo/client';

import client from '../api';

import { AuthProvider } from './useAuth';

const Hooks: React.FC<PropsWithChildren> = ({ children }) => (
  <ApolloProvider client={client}>
    <AuthProvider>{children}</AuthProvider>
  </ApolloProvider>
);

export default Hooks;
