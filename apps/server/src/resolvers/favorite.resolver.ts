import { Resolver, Mutation, Ctx, Args } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findUserById } from '../controllers/user.controller';

import { findMovieById } from '../controllers/movie.controller';

import FavoriteMovie from '../entities/mongo/favorite.interface';

import FavoriteMovieArgs from '../entities/types/args/favorite.args';

@Resolver(() => FavoriteMovie)
class FavoriteResolver {
  @Mutation(() => FavoriteMovie)
  async addFavoriteMovie(
    @Ctx() context: DatasourceContext,
    @Args() { userId, movieId }: FavoriteMovieArgs,
  ) {
    // const user = await findUserById(userId);
    // const movie = await findMovieById(context, movieId);
    // const hasFavoriteMovie = user.favoriteMovies.find(m => m.id === movieId);
    // if (hasFavoriteMovie) {
    //   throw new Error('User already has this movie favorited');
    // }
    // user.favoriteMovies.push(movie);
    // await user.save();
    // return user;
  }

  @Mutation(() => String)
  async removeFavoriteMovie(@Args() { userId, movieId }: FavoriteMovieArgs) {
    // const user = await findUserById(userId);
    // const favoriteMovieIndex = user.favoriteMovies.findIndex(
    //   fm => fm.id === movieId,
    // );
    // if (favoriteMovieIndex < 0) {
    //   throw new Error('User dont have this favorite movie');
    // }
    // user.favoriteMovies.splice(favoriteMovieIndex, 1);
    // await user.save();
    // return user;
  }
}

export default FavoriteResolver;
