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

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
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
    ],
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
  });

  const { url } = await server.listen();

  database();

  console.log(`[Movie House] Server running on ${url}`);
};

main();
