import {
  Arg,
  Mutation,
  Resolver,
  Ctx,
  Int,
  Query,
  FieldResolver,
  Root,
} from 'type-graphql';

import { MovieEntity, ReviewEntity } from '../../../infra/entities';

import { ApolloServerContext } from '../../config/apollo-server-context';

import {
  getCreateReviewService,
  getDeleteReviewService,
  getFindMovieReference,
  getFindReviewService,
  getToggleReviewPin,
} from '../../factories';

@Resolver(() => ReviewEntity)
export class ReviewResolver {
  @FieldResolver(() => MovieEntity)
  async movie(@Root() review: ReviewEntity) {
    const movieReference = getFindMovieReference();

    const movieResponse = await movieReference.handle(review.id);

    return movieResponse?.movie;
  }

  @Query(() => ReviewEntity)
  async review(@Arg('reviewId') reviewId: string) {
    const findReviewService = getFindReviewService();

    const reviewResponse = await findReviewService.handle(reviewId);

    return reviewResponse;
  }

  @Mutation(() => ReviewEntity)
  async createReview(
    @Ctx() { user }: ApolloServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('content') content: string,
  ) {
    const createReviewService = getCreateReviewService();

    const reviewResponse = await createReviewService.handle({
      session: user,
      movieId,
      content,
    });

    return reviewResponse;
  }

  @Mutation(() => Boolean)
  async deleteReview(
    @Ctx() { user }: ApolloServerContext,
    @Arg('reviewId') reviewId: string,
  ) {
    const deleteReviewService = getDeleteReviewService();

    const reviewResponse = await deleteReviewService.handle(reviewId, user);

    return reviewResponse;
  }

  @Mutation(() => Boolean)
  async toggleReviewPin(
    @Ctx() { user }: ApolloServerContext,
    @Arg('reviewId') reviewId: string,
  ) {
    const toggleReviewPinService = getToggleReviewPin();

    const toggleReviewPinResponse = await toggleReviewPinService.handle(
      reviewId,
      user,
    );

    return toggleReviewPinResponse;
  }
}
