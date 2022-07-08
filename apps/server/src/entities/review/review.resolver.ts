import { Resolver, Mutation, Arg, Query, Ctx } from 'type-graphql';

import { CallbackError, isValidObjectId } from 'mongoose';

import { createCrudResolver } from '../base/crud.resolver';

// TODO change that import
import { UserModel, ReviewModel } from '../user/user.models';

import Review from './index';

import ReviewInput from './review.input';
import { DatasourceContext } from '../../api';

const ReviewResolverBase = createCrudResolver(
  'Review',
  Review,
  ReviewInput,
  ReviewModel,
);

@Resolver(() => Review)
class ReviewResolver extends ReviewResolverBase {
  @Query(() => Review)
  async getReview(@Arg('reviewId') id: string) {
    const review = await ReviewModel.findById(id);

    if (!review) {
      throw new Error('Review not found');
    }

    return review;
  }

  @Query(() => [Review])
  async getUserReviews(@Arg('userId') id: string) {
    const userReviews = await ReviewModel.find({ user: id });

    if (!userReviews) {
      throw new Error('Review not found');
    }

    return userReviews;
  }

  @Mutation(() => Review)
  async createReview(
    @Arg('userId') id: string,
    @Arg('movieId') movieId: string,
    @Arg('body') body: string,
    @Ctx() context: DatasourceContext,
  ) {
    if (!isValidObjectId(id)) {
      throw new Error('User not found');
    }

    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const movie = await context.dataSources.tmdb.getMovie(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const review = await ReviewModel.create({ user, movie, body });

    return review;
  }

  @Mutation(() => String)
  async deleteReview(@Arg('reviewId') id: string) {
    await UserModel.findByIdAndRemove(id, (err: CallbackError) => {
      if (!err) return;

      throw new Error(err.message);
    });

    return 'Review deleted with success';
  }
}

export default ReviewResolver;
