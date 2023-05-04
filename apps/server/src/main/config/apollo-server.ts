import express from 'express';

import cors from 'cors';

import http from 'http';

import path from 'path';

import { buildSchema } from 'type-graphql';

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { expressMiddleware } from '@apollo/server/express4';

import { ApolloServer } from '@apollo/server';

import { json } from 'body-parser';

import {
  UserResolver,
  ReviewResolver,
  FindReviewsResolver,
  CommentaryResolver,
  FindCommentariesResolver,
  ReplyResolver,
  FindRepliesResolver,
  MovieResolver,
  StreamingProviderResolver,
  LikeResolver,
  ListResolver,
  PreMadeListResolver,
  FindMoviesReferenceResolver,
  AuthResolver,
  FindListsResolver,
  FollowResolver,
} from '../graphql/resolvers';

import { formatError } from './apollo-server-error';

import { createContext } from './apollo-server-context';

export const setupApolloServer = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ReviewResolver,
      FindReviewsResolver,
      CommentaryResolver,
      FindCommentariesResolver,
      ReplyResolver,
      FindRepliesResolver,
      MovieResolver,
      StreamingProviderResolver,
      LikeResolver,
      ListResolver,
      PreMadeListResolver,
      FindMoviesReferenceResolver,
      AuthResolver,
      FindListsResolver,
      FollowResolver,
    ],
    // resolvers: [path.resolve(__dirname, '..', 'graphql', 'resolvers')],
    emitSchemaFile: path.resolve(__dirname, '..', '..', 'schema.graphql'),
  });

  const server = new ApolloServer({
    schema,
    formatError,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: !process.env.WEB_URL
        ? [
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://studio.apollographql.com',
          ]
        : process.env.WEB_URL,
      credentials: true,
      allowedHeaders:
        'Content-Type,Origin,Access-Control-Request-Headers,Access-Control-Request-Method,Cookie',
    }),
    json(),

    expressMiddleware(server, {
      context: createContext,
    }),
  );

  return httpServer;
};
