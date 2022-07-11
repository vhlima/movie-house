import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../../api';

import Movie from './movie.interface';

@Resolver(() => Movie)
class MovieResolver {
  @Query(() => Movie)
  async getMovie(
    @Arg('movieId') id: string,
    @Ctx() context: DatasourceContext,
  ) {
    const movie = await context.dataSources.tmdb.getMovie(id);

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
