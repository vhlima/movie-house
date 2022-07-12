import 'reflect-metadata';

import path from 'path';

import { ApolloError, ApolloServer } from 'apollo-server';

import { buildSchema } from 'type-graphql';

import { GraphQLError } from 'graphql';

import {
  userResolver,
  movieResolver,
  reviewResolver,
  movieInfoResolver,
  favoriteMovieResolver,
  movieCreditsResolver,
} from './entities';

import database from './database';

import TmdbAPI from './api/tmdb';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      userResolver,
      movieResolver,
      reviewResolver,
      movieInfoResolver,
      favoriteMovieResolver,
      movieCreditsResolver,
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
