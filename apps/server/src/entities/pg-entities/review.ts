import { Field, ID, ObjectType, Root } from 'type-graphql';

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ReviewMovieRepository, UserRepository } from '../../repositories';

import Post from './post';

import Movie from '../mongo-entities/movie';

import User from './user.interface';

import NotFoundError from '../../errors/NotFound';

import UserNotFoundError from '../../errors/UserNotFound';

@ObjectType()
@Entity('reviews')
export default class Review {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'post_id' })
  postId: number;

  @Field(() => Post)
  @OneToOne(() => Post)
  @JoinColumn({
    name: 'post_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'PostId',
  })
  post: Post;

  @Column({ name: 'movie_id' })
  movieId: number;

  @Field()
  @Column({ name: 'is_pinned', nullable: true, default: false })
  isPinned?: boolean;

  @Field(() => User)
  async user(@Root() review: Review) {
    const user = await UserRepository.findOneBy({ id: review.post.userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  @Field(() => Movie)
  async movie(@Root() review: Review) {
    const reviewMovieFound = await ReviewMovieRepository.findOneBy({
      reviewId: review.id,
    });

    if (!reviewMovieFound) {
      throw new NotFoundError('Review movie not found');
    }

    return reviewMovieFound.movie;
  }
}
