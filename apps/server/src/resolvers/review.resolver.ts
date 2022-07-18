import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  Query,
  ResolverInterface,
} from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findMovieById } from '../controllers/movie.controller';

import { findUserById } from '../controllers/user.controller';

import { createPostResolver } from './post.resolver';

import { ReviewModel } from '../models';

import Review from '../entities/review.interface';

import ReviewInput from '../entities/types/review.input';

const PostResolver = createPostResolver<Review>();

@Resolver(() => Review)
class ReviewResolver extends PostResolver implements ResolverInterface<Review> {
  @Query(() => [Review])
  async reviews() {
    const reviews = await ReviewModel.find();

    return reviews;
  }

  @Query(() => Review)
  async review(@Arg('reviewId') reviewId: string) {
    const reviewExists = await ReviewModel.findById(reviewId).populate(
      'author',
    );

    if (!reviewExists) {
      throw new Error('Review not found');
    }

    return reviewExists;
  }

  @Mutation(() => Review)
  async createReview(
    @Ctx() context: DatasourceContext,
    @Arg('userId') userId: string,
    @Arg('movieId') movieId: string,
    @Arg('data') data: ReviewInput,
  ) {
    const user = await findUserById(userId);

    await user.populate('reviews');

    const movie = await findMovieById(context, movieId);

    const reviewExists = user.reviews.find(
      r => (r as Review).movie.id === movieId,
    );

    if (reviewExists) {
      throw new Error('User already made a review about this movie');
    }

    const review = await ReviewModel.create({
      author: user,
      movie,
      ...data,
    });

    user.reviews.push(review);

    await user.save();

    return review;
  }

  @Mutation(() => Review)
  async updateReview(
    @Ctx() context: DatasourceContext,
    @Arg('reviewId') reviewId: string,
    @Arg('data') data: ReviewInput,
  ) {
    const review = await ReviewModel.findByIdAndUpdate(reviewId, data);

    if (!review) {
      throw new Error('Review not found');
    }

    return review;
  }

  @Mutation(() => String)
  async deleteReview(@Arg('reviewId') reviewId: string) {
    const review = await ReviewModel.findByIdAndDelete(reviewId);

    if (!review) {
      throw new Error('Review not found');
    }

    const user = await findUserById(review.author as string);

    const userReviewIndex = user.reviews.findIndex(r => r === reviewId);

    if (userReviewIndex >= 0) {
      user.reviews.splice(userReviewIndex, 1);

      await user.save();
    }

    return 'Deleted with success';
  }
}

export default ReviewResolver;
