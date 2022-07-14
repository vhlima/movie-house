import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import Movie from '../entities/movie.interface';

@Resolver(() => Movie)
class MovieResolver {
  @Query(() => Movie)
  async getMovie(
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
}

export default MovieResolver;
