import 'reflect-metadata';

import path from 'path';

import { ApolloError, ApolloServer } from 'apollo-server';

import { buildSchema } from 'type-graphql';

import { GraphQLError } from 'graphql';

import {
  UserResolver,
  MovieResolver,
  ReviewResolver,
  RateResolver,
  FavoriteResolver,
  CreditsResolver,
  WatchlistResolver,
  LikeResolver,
  CommentaryResolver,
  ReplyResolver,
} from './resolvers';

import { TmdbAPI } from './api';

import database from './database';
import { UserRepository } from './repositories';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      // MovieResolver,
      ReviewResolver,
      // RateResolver,
      // FavoriteResolver,
      // CreditsResolver,
      // WatchlistResolver,
      // LikeResolver,
      CommentaryResolver,
      // ReplyResolver,
    ],
    // resolvers: [path.resolve(__dirname, 'src/resolvers/*.ts')],
    emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      tmdb: new TmdbAPI(),
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

      const token = req.headers.authorization || '';

      if (!token) {
        return { user: null };
      }

      // Try to retrieve a user with the token

      const user = await UserRepository.findOne({ where: { username: 'vtr' } });

      // Add the user to the context

      return { user };
    },
  });

  const { url } = await server.listen();

  database();

  console.log(`[Movie House] Server running on ${url}`);
};

main();
