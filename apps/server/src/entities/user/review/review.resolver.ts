import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import { isValidObjectId } from 'mongoose';

import type { DatasourceContext } from '../../../api';

import { UserModel, ReviewModel } from '../user.models';

import Review from './review.interface';

import ReviewInput from './review.input';
import User from '../user.interface';

@Resolver(() => Review)
class ReviewResolver {
  // async createOrUpdate(
  //   context: DatasourceContext,
  //   { userId, movieId, body }: ReviewInput,
  // ): Promise<Review> {
  //   if (!isValidObjectId(userId)) {
  //     throw new Error('User not found');
  //   }
  //   const user = await UserModel.findById(userId);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const reviewExists = user.reviews.find(r => r.movie.id === movieId);
  //   if (reviewExists) {
  //     const updatedReview = {
  //       ...reviewExists,
  //       body,
  //     };
  //     user.reviews[user.reviews.indexOf(reviewExists)] = updatedReview;
  //     await user.save();
  //     return updatedReview;
  //   }
  //   const movie = await context.dataSources.tmdb.getMovie(movieId);
  //   if (!movie) {
  //     throw new Error('Movie not found');
  //   }
  //   const review = new ReviewModel({ user, movie, body });
  //   user.reviews.push(review);
  //   await user.save();
  //   return review;
  // }
  // @Mutation(() => Review)
  // async createReview(
  //   @Ctx() context: DatasourceContext,
  //   @Arg('data') data: ReviewInput,
  // ) {
  //   const review = await this.createOrUpdate(context, { ...data });
  //   return review;
  // }
  // @Mutation(() => Review)
  // async updateReview(
  //   @Ctx() context: DatasourceContext,
  //   @Arg('data') data: ReviewInput,
  // ) {
  //   const review = await this.createOrUpdate(context, { ...data });
  //   return review;
  // }
  // @Mutation(() => User)
  // async deleteReview(
  //   @Arg('userId') userId: string,
  //   @Arg('reviewId') reviewId: string,
  // ) {
  //   if (!isValidObjectId(userId)) {
  //     throw new Error('User not found');
  //   }
  //   const user = await UserModel.findById(userId);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const reviewIndex = user.reviews.findIndex(r => String(r._id) === reviewId);
  //   if (reviewIndex < 0) {
  //     throw new Error('Review not found');
  //   }
  //   user.reviews.splice(reviewIndex, 1);
  //   await user.save();
  //   return user;
  // }
}

export default ReviewResolver;
