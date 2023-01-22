import { DataSource } from 'typeorm';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL,
  host:
    process.env.NODE_ENV === 'development' ? undefined : process.env.MONGOHOST,
  useNewUrlParser: true, // Needed for mongo
  ssl: true,
  port: parseInt(process.env.MONGOPORT as string, 10),
  database: process.env.MONGO_DATABASE,
  username:
    process.env.NODE_ENV === 'development' ? undefined : process.env.MONGOUSER,
  password:
    process.env.NODE_ENV === 'development'
      ? undefined
      : process.env.MONGOPASSWORD,
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  entities:
    process.env.NODE_ENV === 'development'
      ? ['./src/entities/mongo-entities/**/*.ts']
      : ['./build/src/entities/mongo-entities/**/*.js'],
});

export const connectMongo = async () => {
  try {
    await MongoDataSource.initialize();

    console.log(
      `[Movie House] Mongo connected with sucess | ${process.env.NODE_ENV}`,
    );
  } catch (error) {
    console.error('[Movie House] Error connecting to Mongo: ', error);
  }
};
