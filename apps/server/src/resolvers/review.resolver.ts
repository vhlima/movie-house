import { Resolver, Mutation, Arg, Ctx, Query, Int } from 'type-graphql';

import { ApolloError } from 'apollo-server';
import { ObjectId } from 'mongodb';
import type { ServerContext } from '../types';

import { createPostResolver } from './post.resolver';

import { ReviewRepository, UserRepository } from '../repositories';

import Review from '../entities/mongo-entities/review.interface';

import AuthenticationError from '../errors/Authentication';

import AlreadyExistsError from '../errors/AlreadyExists';

import UserNotFoundError from '../errors/UserNotFound';

import NotFoundError from '../errors/NotFound';

import AuthorizationError from '../errors/Authorization';

const MAX_PINNED_REVIEWS = 3;

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
  async recentReviews() {
    const reviews = await ReviewRepository.find({
      order: { createdAt: 'DESC' },
      take: 8,
    });

    return reviews;
  }

  @Query(() => [Review])
  async moviePopularReviews(@Arg('movieId', () => Int) movieId: number) {
    const reviews = await ReviewRepository.find({
      where: { movieId },
      take: 3,
    });

    return reviews;
  }

  @Query(() => [Review])
  async movieRecentReviews(@Arg('movieId', () => Int) movieId: number) {
    const reviews = await ReviewRepository.find({
      where: { movieId },
      order: { createdAt: 'DESC' },
      take: 3,
    });

    return reviews;
  }

  @Query(() => [Review])
  async popularReviewsWeek() {
    const reviews = await ReviewRepository.find({
      order: { createdAt: 'DESC' },
      take: 6,
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
    @Ctx() { user }: ServerContext,
    @Arg('reviewId') reviewId: string,
    @Arg('body') body: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOneAndUpdate(
      { id: reviewId, authorId: user.id },
      { body },
    );

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    return review;
  }

  @Mutation(() => String)
  async deleteReview(
    @Ctx() { user }: ServerContext,
    @Arg('reviewId') reviewId: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOneBy(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.authorId !== user.id) {
      throw new AuthorizationError();
    }

    await ReviewRepository.delete(reviewId);

    return 'Review deleted';
  }

  @Mutation(() => Review)
  async pinReview(
    @Ctx() { user }: ServerContext,
    @Arg('reviewId') reviewId: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOneBy(reviewId);

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.authorId !== user.id) {
      throw new AuthorizationError();
    }

    if (!review.pinned) {
      const pinnedReviews = await ReviewRepository.findBy({
        authorId: user.id,
        pinned: true,
      });

      if (pinnedReviews.length >= MAX_PINNED_REVIEWS) {
        throw new ApolloError(
          `You have reached the limit of ${MAX_PINNED_REVIEWS} pinned reviews`,
        );
      }

      review.pinned = true;

      await ReviewRepository.save(review);
    } else {
      await ReviewRepository.updateOne(
        {
          _id: new ObjectId(reviewId),
        },
        { $unset: { pinned: null } },
      );

      delete review.pinned;
    }

    return review;
  }
}

export default ReviewResolver;
