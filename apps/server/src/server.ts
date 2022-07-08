import 'reflect-metadata';

import path from 'path';

import { ApolloServer } from 'apollo-server';

import { buildSchema } from 'type-graphql';

import {
  userResolver,
  movieResolver,
  reviewResolver,
  favoriteMovieResolver,
} from './entities';

import database from './database';

import TmdbAPI from './api/tmdb';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      userResolver,
      movieResolver,
      reviewResolver,
      favoriteMovieResolver,
    ],
    emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      tmdb: new TmdbAPI(),
    }),
  });

  const { url } = await server.listen();

  database();

  console.log(`[Movie House] Server running on ${url}`);
};

main();
