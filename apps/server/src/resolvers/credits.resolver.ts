import { Resolver, Query, Arg, Ctx } from 'type-graphql';

import type { DatasourceContext } from '../api';

import { findCreditsByMovieId } from '../controllers/movie.controller';

import MovieCredits from '../entities/movie/credits';

@Resolver(() => MovieCredits)
class MovieCreditsResolver {
  @Query(() => MovieCredits)
  async getMovieCredits(
    @Ctx() context: DatasourceContext,
    @Arg('movieId') movieId: string,
  ) {
    const credits = await findCreditsByMovieId(context, movieId);

    return credits;
  }
}

export default MovieCreditsResolver;
