import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import Review from '../../models/user/Review';

import { ReviewModel } from '../../models/user';

import {
  create,
  remove,
  update,
} from '../../controllers/user/ReviewController';

@Resolver()
class ReviewResolver {
  @Query(() => [Review])
  async reviews() {
    const reviews = await ReviewModel.find();

    return reviews;
  }

  @Mutation(() => Review)
  async createReview(
    @Arg('userId') userId: string,
    @Arg('movieId') movieId: string,
    @Arg('body') body: string,
  ) {
    try {
      const review = await create(userId, movieId, body);

      return review;
    } catch (err) {
      console.error(err);
    }

    return null;
  }

  @Mutation(() => Review)
  async updateReview(
    @Arg('reviewId') reviewId: string,
    @Arg('body') body: string,
  ) {
    try {
      const review = await update(reviewId, { body });

      return review;
    } catch (err) {
      console.error(err);
    }

    return null;
  }

  @Mutation(() => Review)
  async removeReview(@Arg('reviewId') reviewId: string) {
    try {
      await remove(reviewId);
      return 'Removed successfully';
    } catch (err) {
      console.error(err);
    }

    return 'Error';
  }
}

export default ReviewResolver;
