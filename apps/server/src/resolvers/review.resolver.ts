import { Resolver, Mutation, Arg, Ctx, Query, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import {
  PostRepository,
  ReviewMovieRepository,
  ReviewRepository,
  UserLimitRepository,
  UserRepository,
} from '../repositories';

import Review from '../entities/pg-entities/review';

import ErrorBase from '../errors/Error';
import AuthenticationError from '../errors/Authentication';
import AlreadyExistsError from '../errors/AlreadyExists';
import UserNotFoundError from '../errors/UserNotFound';
import NotFoundError from '../errors/NotFound';
import AuthorizationError from '../errors/Authorization';

import LimitType from '../enums/LimitType';

@Resolver(() => Review)
class ReviewResolver {
  @Query(() => Review)
  async review(@Arg('postId', () => Int) postId: number) {
    const reviewExists = await ReviewRepository.findOne({
      where: { postId },
      relations: ['post'],
    });

    if (!reviewExists) {
      throw new NotFoundError('Review not found');
    }

    return reviewExists;
  }

  @Query(() => [Review])
  async reviewsUser(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const reviews = await ReviewRepository.find({
      where: { post: { userId } },
      relations: ['post'],
    });

    return reviews;
  }

  @Query(() => [Review])
  async reviewsRecent() {
    const reviews = await ReviewRepository.find({
      relations: ['post'],
      order: { post: { createdAt: 'DESC' } },
      take: 8,
    });

    return reviews;
  }

  @Query(() => [Review])
  async reviewsPopularFromMovie(@Arg('movieId', () => Int) movieId: number) {
    const reviews = await ReviewRepository.find({
      relations: ['post'],
      where: { movieId },
      take: 3,
    });

    return reviews;
  }

  @Query(() => [Review])
  async reviewsRecentFromMovie(@Arg('movieId', () => Int) movieId: number) {
    const reviews = await ReviewRepository.find({
      where: { movieId },
      relations: ['post'],
      order: { post: { createdAt: 'DESC' } },
      take: 3,
    });

    return reviews;
  }

  @Query(() => [Review])
  async reviewsPopularWeek() {
    const reviews = await ReviewRepository.find({
      relations: ['post'],
      order: { post: { createdAt: 'DESC' } },
      take: 6,
    });

    return reviews;
  }

  @Mutation(() => Review)
  async reviewCreate(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('body') body: string,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const reviewExists = await ReviewRepository.findOne({
      where: {
        post: { userId: user.id },
        movieId,
      },
      relations: ['post'],
    });

    if (reviewExists) {
      throw new AlreadyExistsError(
        'You already created a review about this movie',
      );
    }

    const movie = await dataSources.tmdb.getMovieById(String(movieId));

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const post = PostRepository.create({
      userId: user.id,
      body,
    });

    await PostRepository.save(post);

    const review = ReviewRepository.create({
      postId: post.id,
      movieId: movie.id,
    });

    await ReviewRepository.save(review);

    const reviewMovie = ReviewMovieRepository.create({
      reviewId: review.id,
      movieId: movie.id,
      movie,
    });

    await ReviewMovieRepository.save(reviewMovie);

    const updatedReview = ReviewRepository.findOne({
      where: { id: review.id },
      relations: ['post'],
    });

    return updatedReview;
  }

  @Mutation(() => Boolean)
  async reviewDelete(
    @Ctx() { user }: ServerContext,
    @Arg('postId', () => Int) postId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOne({
      where: { postId },
      relations: ['post'],
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.post.userId !== user.id) {
      throw new AuthorizationError();
    }

    await ReviewRepository.delete({ postId });

    return true;
  }

  @Query(() => [Review])
  async reviewsUserPinned(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const userPinnedReviews = await ReviewRepository.find({
      where: { isPinned: true, post: { userId } },
      relations: ['post'],
    });

    return userPinnedReviews;
  }

  @Query(() => [Review])
  async reviewsUserRecent(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const maxFeaturedReviews = await UserLimitRepository.findOneBy({
      limitType: LimitType.MAX_FEATURED_REVIEWS,
    });

    if (!maxFeaturedReviews) {
      throw new NotFoundError('Featured reviews limit not found');
    }

    const userRecentReviews = await ReviewRepository.find({
      where: { post: { userId: user.id } },
      order: { post: { createdAt: 'DESC' } },
      relations: ['post'],
      take: maxFeaturedReviews.limit,
    });

    return userRecentReviews;
  }

  @Query(() => [Review])
  async reviewsUserPopular(@Arg('userId') userId: string) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const maxFeaturedReviews = await UserLimitRepository.findOneBy({
      limitType: LimitType.MAX_FEATURED_REVIEWS,
    });

    if (!maxFeaturedReviews) {
      throw new NotFoundError('Featured reviews limit not found');
    }

    const userPopularReviews = await ReviewRepository.find({
      where: { post: { userId: user.id } },
      relations: ['post'],
      take: maxFeaturedReviews.limit,
    });

    return userPopularReviews;
  }

  @Mutation(() => Review)
  async reviewPin(
    @Ctx() { user }: ServerContext,
    @Arg('postId', () => Int) postId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOne({
      where: { postId },
      relations: ['post'],
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.post.userId !== user.id) {
      throw new AuthorizationError();
    }

    if (review.isPinned) {
      throw new ErrorBase(
        'AlreadyPinned',
        'This review is already pinned',
        '400',
      );
    }

    const maxPinnedReviews = await UserLimitRepository.findOneBy({
      limitType: LimitType.MAX_PINNED_REVIEWS,
    });

    if (!maxPinnedReviews) {
      throw new NotFoundError('No limit for pinned reviews found');
    }

    const pinnedReviewsCount = await ReviewRepository.countBy({
      post: { userId: user.id },
      isPinned: true,
    });

    if (pinnedReviewsCount >= maxPinnedReviews.limit) {
      throw new ErrorBase(
        'MaxPinnedReviews',
        `You have reached the limit of ${maxPinnedReviews.limit} pinned reviews`,
        '400',
      );
    }

    review.isPinned = true;

    await ReviewRepository.save(review);

    return review;
  }

  @Mutation(() => Review)
  async reviewUnpin(
    @Ctx() { user }: ServerContext,
    @Arg('postId', () => Int) postId: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const review = await ReviewRepository.findOne({
      where: { postId },
      relations: ['post'],
    });

    if (!review) {
      throw new NotFoundError('Review not found');
    }

    if (review.post.userId !== user.id) {
      throw new AuthorizationError();
    }

    if (!review.isPinned) {
      throw new ErrorBase(
        'ReviewNotPinned',
        'This review is not pinned',
        '400',
      );
    }

    review.isPinned = false;

    await ReviewRepository.save(review);

    return review;
  }
}

export default ReviewResolver;
