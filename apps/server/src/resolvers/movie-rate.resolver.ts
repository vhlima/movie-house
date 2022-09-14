import { Resolver, Mutation, Args, Ctx, Query, Arg, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import {
  LikeRepository,
  MovieRateRepository,
  UserRepository,
} from '../repositories';

import MovieRate from '../entities/pg-entities/movie-rate.interface';

import LikeArgs from '../entities/types/args/like.args';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';

@Resolver(() => MovieRate)
export default class MovieRateResolver {
  @Query(() => MovieRate)
  async movieRating(
    @Arg('userId') userId: string,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const user = await UserRepository.findOneBy({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    const rating = await MovieRateRepository.findOneBy({ userId, movieId });

    if (!rating) {
      const fakeRating = MovieRateRepository.create({
        user,
        movieId,
        rating: 0,
      });

      return fakeRating;
    }

    return rating;
  }

  @Mutation(() => Boolean)
  async like(
    @Ctx() { user }: ServerContext,
    @Args() { rootId, referenceId }: LikeArgs,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    const likeExists = await LikeRepository.findOneBy({ rootId, referenceId });

    if (likeExists) {
      await LikeRepository.delete({ userId: user.id, rootId, referenceId });
      return false;
    }

    const like = LikeRepository.create({
      userId: user.id,
      rootId,
      referenceId,
    });

    await LikeRepository.save(like);

    return true;
  }
}
