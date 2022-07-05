import 'reflect-metadata';

import path from 'path';

import { ApolloServer } from 'apollo-server';

import { buildSchema } from 'type-graphql';

import { userResolver, reviewResolver } from './resolvers/user';

import database from './database';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [userResolver, reviewResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.graphql'),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen();

  database();

  console.log(`[Movie House] Server running on ${url}`);
};

main();
