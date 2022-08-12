import { DataSource } from 'typeorm';

import FavoriteMovie from '../../entities/mongo/favorite.interface';
import Like from '../../entities/mongo/like.interface';

import Review from '../../entities/mongo/review.interface';

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  url: 'mongodb+srv://vtr:master123@cluster0.smeez.mongodb.net/?retryWrites=true&w=majority',
  useNewUrlParser: true, // Needed for mongo
  ssl: true,
  port: 27017,
  database: 'test',
  synchronize: false, // TODO on production, remove that
  logging: false, // TODO production, remove that
  entities: [Review, FavoriteMovie, Like],
});

export const connectMongo = async () => {
  try {
    await MongoDataSource.initialize();

    console.log(`[Movie House] Mongo connected with sucess`);
  } catch (error) {
    console.error('[Movie House] Error connecting to Mongo: ', error);
  }
};
