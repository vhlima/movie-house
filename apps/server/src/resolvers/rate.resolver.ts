import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { UserModel } from '../models';

import User from '../entities/user.interface';

import Rate from '../entities/rate.interface';

import RateInput from '../entities/types/rate.input';

@Resolver(() => Rate)
class RateResolver {
  @Mutation(() => User)
  async userAddMovieInfo(
    @Ctx() context: DatasourceContext,
    @Arg('userId') userId: string,
    @Arg('movieId') movieId: string,
    @Arg('data')
    data: RateInput,
  ) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const movie = await context.dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const movieInfoExists = user.ratings.find(m => m.movie.id === movieId);

    if (!movieInfoExists) {
      user.ratings.push({
        movie,
        rating: 0,
        watched: false,
        liked: false,
        ...data,
      });
    } else {
      user.ratings[user.ratings.indexOf(movieInfoExists)] = Object.assign(
        movieInfoExists,
        data,
      );
    }

    await user.save();

    return user;
  }
}

export default RateResolver;
