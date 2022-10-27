import NextAuth from 'next-auth/next';

import GithubProvider from 'next-auth/providers/github';

import { initializeApollo } from '../../../client';

import type {
  UserRegisterMutation,
  UserRegisterMutationVariables,
} from '../../../graphql';

import { UserRegisterDocument } from '../../../graphql';

export default NextAuth({
  session: {
    strategy: 'jwt',
    // The maximum age of the NextAuth.js issued JWT in seconds.
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 30 * 60,
  },
  secret: process.env.JWT_SECRET,
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // session: ({ session, token, user }) => ({
    //   ...session,
    //   accessToken: token,
    //   user: {
    //     ...user,
    //     id: token.id,
    //   },
    // }),
    signIn: async ({ user }) => {
      const apolloClient = initializeApollo();

      await apolloClient.mutate<
        UserRegisterMutation,
        UserRegisterMutationVariables
      >({
        mutation: UserRegisterDocument,
        variables: { githubId: parseInt(user.id, 10) },
      });

      return true;
    },
  },
});
