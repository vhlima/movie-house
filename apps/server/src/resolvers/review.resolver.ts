import { Resolver, Mutation, Arg, Ctx, Query, Int } from 'type-graphql';

import type { DatasourceContext } from '../api';

import type { ServerContext } from '../types';

import { createPostResolver } from './post.resolver';

import { ReviewRepository, UserRepository } from '../repositories';

import Review from '../entities/mongo/review.interface';

import AuthenticationError from '../errors/Authentication';

import AlreadyExistsError from '../errors/AlreadyExists';

import UserNotFoundError from '../errors/UserNotFound';

import NotFoundError from '../errors/NotFound';

const MAX_LATEST_REVIEWS = 3;

const PostResolver = createPostResolver();

@Resolver(() => Review)
class ReviewResolver extends PostResolver {
  @Query(() => Review)
  async review(@Arg('reviewId') reviewId: string) {
    const reviewExists = await ReviewRepository.findOneBy(reviewId);

    if (!reviewExists) {
      throw new NotFoundError('Review not found');
    }

    return reviewExists;
  }

  @Query(() => [Review])
  async reviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.findBy({ authorId: userId });

    return reviews;
  }

  @Query(() => [Review])
  async latestReviews(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.find({
      where: { authorId: userId },
      take: MAX_LATEST_REVIEWS,
      order: { createdAt: 'DESC' },
    });

    return reviews;
  }

  @Mutation(() => Review)
  async createReview(
    @Ctx() context: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('body') body: string,
  ) {
    if (!context.user) {
      throw new AuthenticationError();
    }

    const reviewExists = await ReviewRepository.findOneBy({
      authorId: context.user.id,
      movieId,
    });

    if (reviewExists) {
      throw new AlreadyExistsError(
        'You already created a review about this movie',
      );
    }

    const movie = await context.dataSources.tmdb.getMovieById(String(movieId));

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const review = ReviewRepository.create({
      authorId: context.user.id,
      movieId: movie.id,
      movie,
      body,
    });

    await ReviewRepository.save(review);

    return review;
  }

  @Mutation(() => Review)
  async updateReview(
    @Ctx() context: DatasourceContext,
    @Arg('reviewId') reviewId: string,
    @Arg('body') body: string,
  ) {
    const review = await ReviewRepository.findOneAndUpdate(
      { id: reviewId },
      { body },
    );

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return review;
  }

  @Mutation(() => String)
  async deleteReview(@Arg('reviewId') reviewId: string) {
    const review = await ReviewRepository.findOneBy(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    await ReviewRepository.delete(reviewId);

    return 'Review deleted';
  }
}

export default ReviewResolver;
