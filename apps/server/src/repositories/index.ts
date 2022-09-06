import { PostgresDataSource } from '../database/postgres';

import { MongoDataSource } from '../database/mongo';

import User from '../entities/postgres/user.interface';

import Review from '../entities/mongo/review.interface';

import Like from '../entities/mongo/like.interface';

import FavoriteMovie from '../entities/mongo/favorite.interface';

import WatchlistItem from '../entities/mongo/watchlist.interface';

import Reply from '../entities/postgres/comment/reply.interface';

import Commentary from '../entities/postgres/comment/commentary.interface';
import Follow from '../entities/postgres/follow.interface';

/* Postgres */

export const UserRepository = PostgresDataSource.getRepository(User);

export const CommentaryRepository =
  PostgresDataSource.getRepository(Commentary);

export const ReplyRepository = PostgresDataSource.getRepository(Reply);

export const FollowRepository = PostgresDataSource.getRepository(Follow);

/* Mongo */

export const ReviewRepository = MongoDataSource.getMongoRepository(Review);

export const FavoriteMovieRepository =
  MongoDataSource.getMongoRepository(FavoriteMovie);

export const WatchlistRepository =
  MongoDataSource.getMongoRepository(WatchlistItem);

export const LikeRepository = MongoDataSource.getMongoRepository(Like);
