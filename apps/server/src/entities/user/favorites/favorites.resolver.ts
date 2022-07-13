import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../../../api';

import { UserModel } from '../user.models';

import User from '../user.interface';

@Resolver()
class FavoriteMovieResolver {
  @Mutation(() => User)
  async userAddFavoriteMovie(
    @Arg('userId') id: string,
    @Arg('movieId') movieId: string,
    @Ctx() context: DatasourceContext,
  ) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const movie = await context.dataSources.tmdb.getMovie(movieId);

    if (!movie) {
      throw Error('Movie not found');
    }

    const hasFavoriteMovie = user.favoriteMovies.find(m => m.id === movieId);

    if (hasFavoriteMovie) {
      throw new Error('User already has this movie favorited');
    }

    user.favoriteMovies.push(movie);

    await user.save();

    return user;
  }

  @Mutation(() => User)
  async userRemoveFavoriteMovie(
    @Arg('userId') id: string,
    @Arg('movieId') movieId: string,
  ) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    const oldLength = user.favoriteMovies.length;

    user.favoriteMovies = user.favoriteMovies.filter(fm => fm.id !== movieId);

    if (user.favoriteMovies.length === oldLength) {
      throw new Error('User dont have this favorite movie');
    }

    await user.save();

    return user;
  }
}

export default FavoriteMovieResolver;
