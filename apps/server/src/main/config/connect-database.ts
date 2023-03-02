import { connectPostgres, connectMongo } from '../../infra/data-sources';

export async function connectDatabase() {
  await connectPostgres();
  await connectMongo();
}
