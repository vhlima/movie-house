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
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token, account }) => {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const apolloClient = initializeApollo();

        const { data } = await apolloClient.query<
          FindUserByProviderQuery,
          FindUserByProviderQueryVariables
        >({
          query: FindUserByProviderDocument,
          variables: {
            provider: 'github',
            providerId: account.providerAccountId,
          },
        });

        if (!data) {
          return token;
        }

        const userData = data.userByProvider;

        const updatedToken = { ...token };

        updatedToken.id = userData.id;
        updatedToken.username = userData.username;
        updatedToken.realName = userData.realName;
        updatedToken.profilePictureUrl = userData.profilePictureUrl;

        return updatedToken;
      }

      return token;
    },
    session: async ({ session, token }) => ({
      ...session,
      user: {
        id: token.id,
        username: token.username,
        profilePictureUrl: token.profilePictureUrl,
        realName: token.realName,
      },
    }),
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
