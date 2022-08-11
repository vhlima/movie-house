import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import Movie from '../entities/movie';

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
      releaseDate: m.releaseDate ? new Date(m.releaseDate) : new Date(),
    }));

    return {
      ...searchResponse,
      results,
    };
  }
}

export default MovieResolver;
