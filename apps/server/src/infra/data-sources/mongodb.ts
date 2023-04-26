import { DataSource } from 'typeorm';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  synchronize: process.env.NODE_ENV === 'development',
  logging: true,
  authSource: 'admin',
  entities:
    process.env.NODE_ENV === 'development'
      ? ['./src/infra/entities/mongo/**/*.ts']
      : ['./build/src/infra/entities/mongo/**/*.js'],
  ...(process.env.MONGOURL
    ? {
        url: process.env.MONGOURL,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true,
      }
    : {
        host: process.env.MONGOHOST,
        database: process.env.MONGODATABASE,
        username: process.env.MONGOUSER,
        password: process.env.MONGOPASSWORD,
        port: parseInt(process.env.MONGOPORT as string, 10),
      }),
});

export const connectMongo = async () => {
  try {
    await MongoDataSource.initialize();

    console.log(`[Movie House] Mongo connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Mongo: ', error);
  }
};
