import { PostgresDataSource } from '../database/postgres';

import { MongoDataSource } from '../database/mongo';

import User from '../entities/postgres/user.interface';

import Commentary from '../entities/postgres/comment/commentary.interface';

import Review from '../entities/mongo/review.interface';

import Like from '../entities/postgres/like.interface';

/* Postgres */

export const UserRepository = PostgresDataSource.getRepository(User);

export const CommentaryRepository =
  PostgresDataSource.getRepository(Commentary);

export const LikeRepository = PostgresDataSource.getRepository(Like);

/* Mongo */

export const ReviewRepository = MongoDataSource.getMongoRepository(Review);
