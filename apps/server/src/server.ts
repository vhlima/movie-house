import 'reflect-metadata';

import dotenv from 'dotenv';

/* eslint-disable import/first */
dotenv.config();

import path from 'path';

import { ApolloError, ApolloServer } from 'apollo-server';

import { buildSchema } from 'type-graphql';

import { GraphQLError } from 'graphql';

import {
  UserResolver,
  MovieResolver,
  ReviewResolver,
  ProfileResolver,
  FollowResolver,
  LikeResolver,
  CommentaryResolver,
  ReplyResolver,
  MovieRateResolver,
} from './resolvers';

import { TmdbAPI, GithubAPI } from './api';

import { UserRepository } from './repositories';

import { connectDatabase } from './database';
import UserListCustomResolver from './resolvers/user-list-custom.resolver';
import UserListPreMadeResolver from './resolvers/user-list-premade.resolver';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      MovieResolver,
      ReviewResolver,
      ProfileResolver,
      FollowResolver,
      LikeResolver,
      CommentaryResolver,
      ReplyResolver,
      MovieRateResolver,
      UserListCustomResolver,
      UserListPreMadeResolver,
    ],
    // resolvers: [path.resolve(__dirname, 'src/resolvers/*.ts')],
    emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      tmdb: new TmdbAPI(),
      github: new GithubAPI(),
    }),
    formatError: (error: GraphQLError) => {
      if (error.originalError instanceof ApolloError) {
        return error;
      }

      if (error instanceof GraphQLError) {
        return error;
      }

      const now = Date.now();

      console.log(`Unexpected error occurred: ${now}`);
      console.error(error);

      return new GraphQLError(`Internal server error: ${now}`);
    },
    context: async ({ req }) => {
      // Note: This example uses the `req` argument to access headers,
      // but the arguments received by `context` vary by integration.

      // This means they vary for Express, Koa, Lambda, etc.

      // To find out the correct arguments for a specific integration,
      // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

      // Get the user token from the headers.

      const defaultProps = { user: null };

      const token = req.headers.authorization || '';

      if (!token) {
        return defaultProps;
      }

      // Try to retrieve a user with the token

      try {
        console.log(`run context`);

        const user = await UserRepository.findOne({
          where: { username: 'vtr' },
        });

        console.log(`end context`);
        return { user };
      } catch (error) {
        return defaultProps;
      }
    },
  });

  const { url } = await server.listen();

  await connectDatabase();

  console.log(`[Movie House] Server running on ${url}`);
};

main();
