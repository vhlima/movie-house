import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import Movie from '../entities/movie.interface';

import MovieSearch from '../entities/movieSearch.interface';

@Resolver(() => Movie)
class MovieResolver {
  @Query(() => Movie)
  async movie(
    @Ctx() context: DatasourceContext,
    @Arg('movieId') movieId: string,
  ) {
    const movie = await context.dataSources.tmdb.getMovieById(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    return {
      ...movie,
      release_date: new Date(movie.release_date),
    };
  }

  @Query(() => MovieSearch)
  async searchMovie(
    @Ctx() context: DatasourceContext,
    @Arg('searchTerm') searchTerm: string,
  ) {
    const searchResponse = await context.dataSources.tmdb.searchMovie(
      searchTerm,
    );

    // TODO bug: Invalid time value

    const results = searchResponse.results.map(m => ({
      ...m,
      release_date: m.release_date ? new Date(m.release_date) : new Date(),
    }));

    return {
      ...searchResponse,
      results,
    };
  }
}

export default MovieResolver;
