import { PostgresDataSource } from '../database/postgres';

import { MongoDataSource } from '../database/mongo';

/* Postgres Imports */

import User from '../entities/pg-entities/user.interface';

import Follow from '../entities/pg-entities/follow.interface';

import Reply from '../entities/pg-entities/comment/reply.interface';

import Commentary from '../entities/pg-entities/comment/commentary.interface';

/* Mongo Imports */

import Review from '../entities/mongo-entities/review.interface';

import Like from '../entities/mongo-entities/like.interface';

import UserListCustom from '../entities/mongo-entities/user-list-custom.interface';

import UserListPremadeMovie from '../entities/mongo-entities/user-list-premade-movie.interface';
import UserListCustomMovie from '../entities/mongo-entities/user-list-custom-movie.interface';

/* Postgres Repositories */

export const UserRepository = PostgresDataSource.getRepository(User);

export const CommentaryRepository =
  PostgresDataSource.getRepository(Commentary);

export const ReplyRepository = PostgresDataSource.getRepository(Reply);

export const FollowRepository = PostgresDataSource.getRepository(Follow);

/* Mongo Repositories */

export const ReviewRepository = MongoDataSource.getMongoRepository(Review);

export const LikeRepository = MongoDataSource.getMongoRepository(Like);

export const UserListCustomMovieRepository =
  MongoDataSource.getMongoRepository(UserListCustomMovie);

export const UserListCustomRepository =
  MongoDataSource.getMongoRepository(UserListCustom);

export const UserListPremadeMovieRepository =
  MongoDataSource.getMongoRepository(UserListPremadeMovie);
