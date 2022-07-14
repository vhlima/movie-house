import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findUserById } from '../controllers/user.controller';

import { findMovieById } from '../controllers/movie.controller';

import User from '../entities/user.interface';

import WatchlistItem from '../entities/watchlist.interface';

@Resolver(() => WatchlistItem)
class WatchlistItemResolver {
  @Mutation(() => User)
  async addMovieToWatchlist(
    @Ctx() context: DatasourceContext,
    @Arg('userId') userId: string,
    @Arg('movieId') movieId: string,
  ) {
    const user = await findUserById(userId);

    const movieExists = user.watchlist.find(m => m.id === movieId);

    if (movieExists) {
      throw new Error('This movie is already in your watchlist');
    }

    const movie = await findMovieById(context, movieId);

    user.watchlist.push(movie);

    await user.save();

    return user;
  }

  @Mutation(() => User)
  async removeMovieFromWatchlist(
    @Ctx() context: DatasourceContext,
    @Arg('userId') userId: string,
    @Arg('movieId') movieId: string,
  ) {
    const user = await findUserById(userId);

    const movieExistsIndex = user.watchlist.findIndex(m => m.id === movieId);

    if (movieExistsIndex < 0) {
      throw new Error('This movie is not in your watchlist');
    }

    user.watchlist.splice(movieExistsIndex, 1);

    await user.save();

    return user;
  }
}

export default WatchlistItemResolver;
