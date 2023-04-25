import { DataSource } from 'typeorm';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  host: process.env.MONGOHOST,
  useNewUrlParser: true,
  ssl: process.env.MONGO_SSL ? process.env.MONGO_SSL === 'true' : false,
  useUnifiedTopology: true,
  port: parseInt(process.env.MONGOPORT as string, 10),
  database: process.env.MONGO_DATABASE,
  username: process.env.MONGOUSER,
  password: process.env.MONGOPASSWORD,
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  authSource: 'admin',
  entities:
    process.env.NODE_ENV === 'development'
      ? ['./src/infra/entities/mongo/**/*.ts']
      : ['./build/src/infra/entities/mongo/**/*.js'],
});

export const connectMongo = async () => {
  try {
    await MongoDataSource.initialize();

    console.log(`[Movie House] Mongo connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Mongo: ', error);
  }
};
