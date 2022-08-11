import { connectMongo } from './mongo';

import { connectPostgres } from './postgres';

export default async () => {
  await connectPostgres();
  await connectMongo();
};
