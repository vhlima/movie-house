import NextAuth from 'next-auth/next';

import GithubProvider from 'next-auth/providers/github';

import { initializeApollo } from '../../../client';

import type {
  FindUserByIdQuery,
  FindUserByIdQueryVariables,
  SignUpMutation,
  SignUpMutationVariables,
} from '../../../graphql';

import { SignUpDocument, FindUserByIdDocument } from '../../../graphql';

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
    jwt: ({ token, user }) =>
      user
        ? {
            user: {
              id: user.id,
            },
          }
        : {
            user: {
              id: token.user.id,
            },
          },
    session: async ({ token, session }) => {
      if (!token) return session;

      const apolloClient = initializeApollo();

      try {
        const { data: userData } = await apolloClient.query<
          FindUserByIdQuery,
          FindUserByIdQueryVariables
        >({
          query: FindUserByIdDocument,
          variables: {
            userId: token.user.id,
          },
        });

        if (!userData) {
          return null;
        }

        const { __typename, ...user } = userData.userById;

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

        return response.data.signUp;
      } catch (err) {
        return false;
      }
    },
  },
});
