import { Resolver, Mutation, Arg } from 'type-graphql';

import { UserModel } from '../user.models';

import User from '../user.interface';

import FavoriteMovie from './index';

import FavoriteMovieInput from './favorites.input';

@Resolver(() => FavoriteMovie)
class FavoriteMovieResolver {
  @Mutation(() => User)
  async userAddFavoriteMovie(
    @Arg('userId') id: string,
    @Arg('data') data: FavoriteMovieInput,
  ) {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    user.favoriteMovies.push(data);

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

    user.favoriteMovies = user.favoriteMovies.filter(
      fm => fm.movieId === movieId,
    );

    if (user.favoriteMovies.length === oldLength) {
      throw new Error('User dont have this favorite movie');
    }

    await user.save();

    return user;
  }
}

export default FavoriteMovieResolver;
