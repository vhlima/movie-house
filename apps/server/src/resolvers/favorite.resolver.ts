import { Resolver } from 'type-graphql';

import { FavoriteMovieRepository } from '../repositories';

import FavoriteMovie from '../entities/mongo/favorite.interface';

import { createMovieListResolver } from './movieList.resolver';

const MovieListResolver = createMovieListResolver<FavoriteMovie>(
  () => FavoriteMovie,
  FavoriteMovieRepository,
  {
    findName: 'favoriteMovies',
    findOneName: 'favoriteMovie',
    addName: 'addFavoriteMovie',
    removeName: 'removeFavoriteMovie',
  },
);

@Resolver(() => FavoriteMovie)
class FavoriteResolver extends MovieListResolver {}

export default FavoriteResolver;
