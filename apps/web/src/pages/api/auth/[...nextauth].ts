import NextAuth from 'next-auth/next';

import GithubProvider from 'next-auth/providers/github';

import { initializeApollo } from '../../../client';

import type {
  FindUserByProviderQuery,
  FindUserByProviderQueryVariables,
  UserRegisterMutation,
  UserRegisterMutationVariables,
} from '../../../graphql';

import {
  UserRegisterDocument,
  FindUserByProviderDocument,
} from '../../../graphql';

export default NextAuth({
  session: {
    strategy: 'jwt',
    // The maximum age of the NextAuth.js issued JWT in seconds.
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 30 * 60,
  },
  secret: process.env.JWT_SECRET,
  // debug: process.env.NODE_ENV === 'development',
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account) {
        return {
          user: {
            providerId: account.providerAccountId,
          },
        };
      }

      return token;
    },
    session: async ({ token, session }) => {
      if (!token) return session;

      const apolloClient = initializeApollo();

      try {
        const { data: userData } = await apolloClient.query<
          FindUserByProviderQuery,
          FindUserByProviderQueryVariables
        >({
          query: FindUserByProviderDocument,
          variables: {
            provider: 'github',
            providerId: token.user.providerId,
          },
        });

        if (!userData) {
          return null;
        }

        const { __typename, ...user } = userData.userByProvider;

        return {
          ...session,
          user,
        };
      } catch (err) {
        console.log(err);
        return null;
      }
    },
    signIn: async ({ account }) => {
      const apolloClient = initializeApollo();

      console.log(
        `register user? ${account.providerAccountId} | ${parseInt(
          account.providerAccountId,
          10,
        )} |  ${JSON.stringify(account)}`,
      );

      try {
        await apolloClient.mutate<
          UserRegisterMutation,
          UserRegisterMutationVariables
        >({
          mutation: UserRegisterDocument,
          variables: { githubId: parseInt(account.providerAccountId, 10) },
        });

        return true;
      } catch (err) {
        console.log(err);

        return false;
      }
    },
  },
});
