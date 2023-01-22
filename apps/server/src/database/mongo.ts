import { DataSource } from 'typeorm';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_HOST,
  useNewUrlParser: true, // Needed for mongo
  ssl: true,
  port: parseInt(process.env.MONGO_PORT as string, 10),
  database: process.env.MONGO_DATABASE,
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
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
