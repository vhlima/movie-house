import NextAuth from 'next-auth/next';

import GithubProvider from 'next-auth/providers/github';

import { initializeApollo } from '../../../client';

import type {
  FindUserByGithubIdQuery,
  FindUserByGithubIdQueryVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from '../../../graphql';

import { SignUpDocument, FindUserByGithubIdDocument } from '../../../graphql';

export default NextAuth({
  session: {
    strategy: 'jwt',
    // The maximum age of the NextAuth.js issued JWT in seconds.
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 30 * 60,
  },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === 'development',
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
          providerId: account.providerAccountId,
        };
      }

      return token;
    },
    session: async ({ token, session }) => {
      if (!token || !token.providerId) return session;

      const apolloClient = initializeApollo();

      try {
        const { data: userData } = await apolloClient.query<
          FindUserByGithubIdQuery,
          FindUserByGithubIdQueryVariables
        >({
          query: FindUserByGithubIdDocument,
          variables: {
            githubId: token.providerId,
          },
        });

        if (!userData) {
          return null;
        }

        const { __typename, ...user } = userData.userByGithubId;

        return {
          ...session,
          user,
        };
      } catch (err) {
        return null;
      }
    },
    signIn: async ({ account }) => {
      const apolloClient = initializeApollo();

      try {
        const response = await apolloClient.mutate<
          SignUpMutation,
          SignUpMutationVariables
        >({
          mutation: SignUpDocument,
          variables: { githubId: account.providerAccountId },
        });

        if (!response || !response.data) {
          return false;
        }

        return true;
      } catch (err) {
        return false;
      }
    },
  },
});
