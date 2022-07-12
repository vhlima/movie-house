import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../../../api';

import { UserModel } from '../user.models';

import User from '../user.interface';

import MovieInfo from './movieinfo.interface';

import MovieInfoInput from './movieinfo.input';

@Resolver(() => MovieInfo)
class MovieInfoResolver {
  @Mutation(() => User)
  async userAddMovieInfo(
    @Ctx() context: DatasourceContext,
    @Arg('data')
    { userId, movieId, ...data }: MovieInfoInput,
  ) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const movie = await context.dataSources.tmdb.getMovie(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const movieInfoExists = user.moviesInfo.find(m => m.movie.id === movieId);

    if (!movieInfoExists) {
      user.moviesInfo.push({
        movie,
        rating: 0,
        watched: false,
        liked: false,
        ...data,
      });
    } else {
      user.moviesInfo[user.moviesInfo.indexOf(movieInfoExists)] = Object.assign(
        movieInfoExists,
        data,
      );
    }

    await user.save();

    return user;
  }
}

export default MovieInfoResolver;
