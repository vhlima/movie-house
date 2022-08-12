import { Resolver, Query, Arg, Ctx, Int } from 'type-graphql';

import type { ServerContext } from '../types';

import Movie from '../entities/movie';

import MovieSearch from '../entities/movieSearch.interface';

import NotFoundError from '../errors/NotFound';

@Resolver(() => Movie)
class MovieResolver {
  @Query(() => Movie)
  async movie(
    @Ctx() context: ServerContext,
    @Arg('movieId', () => Int) movieId: number,
  ) {
    const movie = await context.dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    return movie;
  }

  @Query(() => MovieSearch)
  async searchMovie(
    @Ctx() context: ServerContext,
    @Arg('searchTerm') searchTerm: string,
  ) {
    const searchResponse = await context.dataSources.tmdb.searchMovie(
      searchTerm,
    );

    // TODO bug: Invalid time value

    const results = searchResponse.results.map(m => ({
      ...m,
      // releaseDate: m.releaseDate ? new Date(m.releaseDate) : new Date(),
    }));

    return {
      ...searchResponse,
      results,
    };
  }
}

export default MovieResolver;
