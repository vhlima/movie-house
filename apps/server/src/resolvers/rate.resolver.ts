import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findUserById } from '../controllers/user.controller';

import { findMovieById } from '../controllers/movie.controller';

import User from '../entities/postgres/user.interface';

import Rate from '../entities/mongo/rate.interface';

import RateInput from '../entities/types/rate.input';

const defaultProps = {
  rating: 0,
  watched: false,
  liked: false,
};

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
    // const user = await findUserById(userId);
    // const movie = await findMovieById(context, movieId);
    // const rateExists = user.ratings.find(m => m.movie.id === movieId);
    // if (!rateExists) {
    //   user.ratings.push({
    //     movie,
    //     ...defaultProps,
    //     ...data,
    //   });
    // } else {
    //   const updatedRate = Object.assign(rateExists, data);
    //   const rateIndex = user.ratings.indexOf(rateExists);
    //   // TODO test that
    //   if (JSON.stringify(updatedRate) !== JSON.stringify(defaultProps)) {
    //     user.ratings[rateIndex] = updatedRate;
    //   } else {
    //     user.ratings.splice(rateIndex, 1);
    //   }
    // }
    // await user.save();
    // return user;
  }
}

export default RateResolver;
