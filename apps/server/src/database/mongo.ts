import { DataSource } from 'typeorm';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  host: process.env.MONGOHOST,
  useNewUrlParser: true,
  ssl: process.env.NODE_ENV === 'development',
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
      ? ['./src/entities/mongo-entities/**/*.ts']
      : ['./build/src/entities/mongo-entities/**/*.js'],
});

export const connectMongo = async () => {
  try {
    await MongoDataSource.initialize();

    console.log(`[Movie House] Mongo connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Mongo: ', error);
  }
};
