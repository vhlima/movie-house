import { connectMongo } from './mongo';

import { connectPostgres } from './postgres';

export const connectDatabase = async () => {
  await connectPostgres();
  await connectMongo();
};
