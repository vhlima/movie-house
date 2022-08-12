import { Resolver } from 'type-graphql';

import { WatchlistRepository } from '../repositories';

import WatchlistItem from '../entities/mongo/favorite.interface';

import { createMovieListResolver } from './movieList.resolver';

const MovieListResolver = createMovieListResolver<WatchlistItem>(
  () => WatchlistItem,
  WatchlistRepository,
  {
    findName: 'watchlist',
    findOneName: 'watchlistItem',
    addName: 'addMovieToWatchlist',
    removeName: 'removeMovieFromWatchlist',
  },
);

@Resolver(() => WatchlistItem)
class WatchlistResolver extends MovieListResolver {}

export default WatchlistResolver;
