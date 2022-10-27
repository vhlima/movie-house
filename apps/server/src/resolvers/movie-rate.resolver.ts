import { Resolver, Query, Arg, Int, Mutation, Ctx } from 'type-graphql';

import { GraphQLError } from 'graphql';
import type { ServerContext } from '../types';

import { MovieRateRepository, UserRepository } from '../repositories';

import MovieRate from '../entities/pg-entities/movie-rate.interface';

import NotFoundError from '../errors/NotFound';

import UserNotFoundError from '../errors/UserNotFound';

import AuthenticationError from '../errors/Authentication';
import BadRequestError from '../errors/BadRequest';

@Resolver(() => MovieRate)
export default class MovieRateResolver {
  @Query(() => MovieRate, { nullable: true })
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
      return null;
    }

    return rating;
  }

  @Mutation(() => MovieRate)
  async rateMovie(
    @Ctx() { user, dataSources }: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
    @Arg('rating', () => Int) rating: number,
  ) {
    if (!user) {
      throw new AuthenticationError();
    }

    if (rating <= 0 || rating > 10) {
      throw new BadRequestError('Rating must be in the range of 1-10');
    }

    const movie = dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    const movieRate = MovieRateRepository.create({
      userId: user.id,
      movieId,
      rating,
    });

    await MovieRateRepository.save(movieRate);

    return movieRate;
  }
}
