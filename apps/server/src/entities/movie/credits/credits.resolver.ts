import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../../../api';

import MovieCredits from './credits.interface';

@Resolver(() => MovieCredits)
class MovieCreditsResolver {
  @Query(() => MovieCredits)
  async getMovieCredits(
    @Arg('movieId') id: string,
    @Ctx() context: DatasourceContext,
  ) {
    const movieCredits = await context.dataSources.tmdb.getMovieCredits(id);

    if (!movieCredits) {
      throw new Error('Movie not found');
    }

    return movieCredits;
  }
}

export default MovieCreditsResolver;
