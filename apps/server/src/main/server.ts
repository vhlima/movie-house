import 'reflect-metadata';

import { env } from './config/env';

import { setupApolloServer } from './config/apollo-server';

import { connectDatabase } from './config/connect-database';

setupApolloServer().then(async httpServer => {
  try {
    await connectDatabase();

    httpServer.listen({ port: env.port }, () => {
      console.log(`[Movie House] 🚀 Server running on URL:${env.port}`);
    });
  } catch (err) {
    console.log('[Movie House] Could not start the server');
    process.exit();
  }
});
