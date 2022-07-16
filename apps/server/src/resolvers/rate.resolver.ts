import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findUserById } from '../controllers/user.controller';

import { findMovieById } from '../controllers/movie.controller';

import User from '../entities/user.interface';

import Rate from '../entities/rate.interface';

import RateInput from '../entities/types/rate.input';

@Resolver(() => Rate)
class RateResolver {
  @Mutation(() => User)
  async userAddRate(
    @Ctx() context: DatasourceContext,
    @Arg('userId') userId: string,
    @Arg('movieId') movieId: string,
    @Arg('data')
    data: RateInput,
  ) {
    const user = await findUserById(userId);

    const movie = await findMovieById(context, movieId);

    const rateExists = user.ratings.find(m => m.movie.id === movieId);

    if (!rateExists) {
      user.ratings.push({
        movie,
        rating: 0,
        watched: false,
        liked: false,
        ...data,
      });
    } else {
      user.ratings[user.ratings.indexOf(rateExists)] = Object.assign(
        rateExists,
        data,
      );
    }

    await user.save();

    return user;
  }
}

export default RateResolver;