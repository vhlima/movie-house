import { PostgresDataSource } from '../database/postgres';

import { MongoDataSource } from '../database/mongo';

/* Postgres Imports */

import User from '../entities/pg-entities/user.interface';

import Follow from '../entities/pg-entities/follow.interface';

import Reply from '../entities/pg-entities/comment/reply.interface';

import Post from '../entities/pg-entities/post';

import Review from '../entities/pg-entities/review';

import UserLimit from '../entities/pg-entities/limit';

import UserProvider from '../entities/pg-entities/user-provider';

import Commentary from '../entities/pg-entities/comment/commentary.interface';

/* Mongo Imports */

import Like from '../entities/mongo-entities/like.interface';

import ListMovie from '../entities/mongo-entities/list-movie';

import PreMadeList from '../entities/pg-entities/pre-made-list';

import List from '../entities/pg-entities/list';

import ReviewMovie from '../entities/mongo-entities/review-movie';

/* Postgres Repositories */

export const UserRepository = PostgresDataSource.getRepository(User);

export const UserProviderRepository =
  PostgresDataSource.getRepository(UserProvider);

export const CommentaryRepository =
  PostgresDataSource.getRepository(Commentary);

export const ReplyRepository = PostgresDataSource.getRepository(Reply);

export const FollowRepository = PostgresDataSource.getRepository(Follow);

export const ReviewRepository = PostgresDataSource.getRepository(Review);

export const UserLimitRepository = PostgresDataSource.getRepository(UserLimit);

export const PostRepository = PostgresDataSource.getRepository(Post);

export const PreMadeListRepository =
  PostgresDataSource.getRepository(PreMadeList);

export const ListRepository = PostgresDataSource.getRepository(List);

/* Mongo Repositories */

export const LikeRepository = MongoDataSource.getMongoRepository(Like);

export const ListMovieRepository =
  MongoDataSource.getMongoRepository(ListMovie);

export const ReviewMovieRepository =
  MongoDataSource.getMongoRepository(ReviewMovie);
