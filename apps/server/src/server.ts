import 'reflect-metadata';

import express from 'express';

import cors from 'cors';

import http from 'http';

import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { expressMiddleware } from '@apollo/server/express4';

import { ApolloServer } from '@apollo/server';

import { json } from 'body-parser';

import { context } from './server/context';
import { formatError } from './server/formatError';
import { buildSchema } from './server/buildSchema';

import { connectDatabase } from './database';

const main = async () => {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema();

  const server = new ApolloServer({
    schema,
    formatError,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  try {
    await connectDatabase();

    await server.start();

    app.use(
      cors<cors.CorsRequest>({
        origin:
          process.env.NODE_ENV === 'development'
            ? [
                'http://localhost:3000',
                'http://127.0.0.1:3000',
                'https://studio.apollographql.com',
              ]
            : ['https://movie-house.up.railway.app'],
        credentials: true,
      }),
      json(),

      expressMiddleware(server, {
        context,
      }),
    );

    /* eslint-disable no-promise-executor-return */
    await new Promise<void>(resolve =>
      httpServer.listen({ port: 4000 }, resolve),
    );

    console.log(`[Movie House] 🚀 Server running on URL`);
  } catch (err) {
    console.error(err);
  }
};

main();
